import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User, createUser } from "../entity/User";
import { HTTP404Error } from "../utils/httpErrors";

export class UserController {
  private userRepository = getRepository(User);

  async all(req: Request, res: Response) {
    const users = this.userRepository.find();
    return users;
  }

  async one(req: Request, res: Response) {
    const { uuid } = req.query;
    const user = await this.userRepository.findOne({
      where: uuid
    });

    if (!user) {
      throw new HTTP404Error("user not found");
    }

    return user;
  }

  async oneWithReadings(req: Request, res: Response) {
    const { uuid } = req.query;
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.sleepCycles", "sleepCycles")
      .leftJoinAndSelect("sleepCycles.readings", "readings")
      .where("user.uuid = :uuid", { uuid })
      .getOne();

    if (!user) {
      throw new HTTP404Error("user not found");
    }

    return user;
  }

  async save(req: Request, res: Response) {
    const userData = req.body;
    const user = createUser(userData);

    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async toggleSleeping(req: Request, res: Response) {
    const { uuid } = req.query;
    const user = await this.userRepository.findOne({
      where: uuid
    });

    if (!user) {
      throw new HTTP404Error("user not found");
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
