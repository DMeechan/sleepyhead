import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { User, createUser } from "../entity/User";
import { throwError } from "../utils/httpErrors";
import {
  createSleepCycle,
  SleepCycle,
  getLatestSleepCycle
} from "../entity/SleepCycle";
import {
  Reading,
  getQualityScores,
  getReadingsForCycle
} from "../entity/Reading";

export class UserController {
  private userRepository = getRepository(User);
  private sleepCycleRepository = getRepository(SleepCycle);
  private readingRepository = getRepository(Reading);

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

    user.sleepCycles.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    user.sleepCycles.forEach((cycle: SleepCycle) => {
      cycle.readings.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    });

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
    // Get user and their slepe cycles
    const { uuid } = req.params;
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.sleepCycles", "sleepCycles")
      .where("user.uuid = :uuid", { uuid })
      .getOne();

    if (!user) {
      return throwError(next, 400, "user not found");
    }

    const { isSleeping } = user;
    if (isSleeping) {
      const latestCycle = getLatestSleepCycle(user.sleepCycles);

      // Get the latest cycle and finish it
      if (latestCycle) {
        latestCycle.endedAt = new Date();

        // Calculate quality scores
        const readings = await getReadingsForCycle(
          this.readingRepository,
          latestCycle
        );

        const { quality, factors } = getQualityScores(readings);
        console.log({ quality, factors });

        latestCycle.quality = quality || 0;
        latestCycle.temperatureQuality = factors.temperature || 0;
        latestCycle.tvocQuality = factors.tvoc || 0;
        latestCycle.eco2Quality = factors.eco2 || 0;
        latestCycle.noiseQuality = factors.noise || 0;
        latestCycle.irQuality = factors.ir || 0;
        latestCycle.blueQuality = factors.blue || 0;
        latestCycle.luminanceQuality = factors.luminance || 0;
        latestCycle.uvQuality = factors.uv || 0;

        await this.sleepCycleRepository.save(latestCycle);
      }
    } else {
      // Create new sleep cycle
      const cycle = createSleepCycle(user);
      const savedCycle = await this.sleepCycleRepository.save(cycle);
      user.sleepCycles.push(savedCycle);

      // Avoid a circular reference
      delete savedCycle.user;
    }

    user.isSleeping = !isSleeping;
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
