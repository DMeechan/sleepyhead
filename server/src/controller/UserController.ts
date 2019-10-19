import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { User, createUser } from "../entity/User";
import { throwError } from "../utils/httpErrors";

export class UserController {
  private userRepository = getRepository(User);

  async getOne(uuid: string) {
    return this.userRepository.findOne({
      where: {
        uuid
      }
    });
  }

  async all(req: Request, res: Response, next: NextFunction) {
    const users = this.userRepository.find();
    return users;
  }

  async one(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const user = await this.getOne(uuid);

    if (!user) {
      return throwError(next, 400, "user not found");
    }

    return user;
  }

  async oneWithReadings(req: Request, res: Response, next: NextFunction) {
    // Order sleep cycles reverse chronologically (latest first)
    // And order readings chronologically
    const { uuid } = req.params;
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.sleepCycles", "sleepCycles")
      .leftJoinAndSelect("sleepCycles.readings", "readings")
      .where("user.uuid = :uuid", { uuid })
      .getOne();

    if (!user) {
      return throwError(next, 400, "user not found");
    }

    return user;
  }

  async save(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;

    const usernameIsValid =
      username && username.length > 0 && username.length < 64;
    if (!usernameIsValid) {
      throwError(next, 400, "invalid username");
    }

    const existingUser = await this.userRepository.findOne({
      where: {
        username
      }
    });
    if (existingUser) {
      // throwError(next, 400, "user already exists");
      return existingUser;
    }

    const user = createUser(username);
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async toggleSleeping(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const user = await this.getOne(uuid);

    if (!user) {
      return throwError(next, 400, "user not found");
    }

    const { isSleeping } = user;
    if (isSleeping) {
      // find and end sleep cycle
    } else {
      // create new sleep cycle
    }

    user.isSleeping = !isSleeping;
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
