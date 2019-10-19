import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Reading, createReading, ReadingType } from "../entity/Reading";
import { SleepCycle, getLatestSleepCycle } from "../entity/SleepCycle";
import { throwError } from "../utils/httpErrors";
import { User } from "../entity/User";

export class ReadingController {
  private userRepository = getRepository(User);
  private readingRepository = getRepository(Reading);

  async save(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const readingData = req.body;
    if (readingData.length < 1) {
      throwError(next, 400, "missing readings");
    }

    // Get the user
    const user: User | undefined = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.sleepCycles", "sleepCycles")
      .where("user.uuid = :uuid", { uuid })
      .getOne();

    if (!user) {
      return throwError(next, 400, "user not found");
    }

    if (!user.isSleeping) {
      return throwError(next, 409, "User is not sleeping");
    }

    // Get the user's latest sleepcycle
    const latestCycle = getLatestSleepCycle(user.sleepCycles);
    if (!latestCycle) {
      return throwError(next, 409, "User is in a sleep cycle");
    }

    let readings: Reading[] = [];
    if (readingData.temperature) {
      readings.push(
        createReading(ReadingType.TEMPERATURE, readingData.temperature)
      );
    }
    if (readingData.tvoc) {
      readings.push(createReading(ReadingType.TVOC, readingData.tvoc));
    }
    if (readingData.eco2) {
      readings.push(createReading(ReadingType.ECO2, readingData.eco2));
    }
    if (readingData.noise) {
      readings.push(createReading(ReadingType.NOISE, readingData.noise));
    }
    if (readingData.ir) {
      readings.push(createReading(ReadingType.IR, readingData.ir));
    }
    if (readingData.blue) {
      readings.push(createReading(ReadingType.BLUE, readingData.blue));
    }
    if (readingData.luminance) {
      readings.push(
        createReading(ReadingType.LUMINANCE, readingData.luminance)
      );
    }
    if (readingData.uv) {
      readings.push(createReading(ReadingType.UV, readingData.uv));
    }
    console.log(5);

    let savedReadings: Reading[] = [];
    readings.forEach(async (reading: Reading) => {
      reading.sleepCycle = latestCycle;
      console.log("Adding reading to user", uuid, " : ", reading);
      const savedReading = await this.readingRepository.save(reading);
      savedReadings.push(savedReading);
    });

    return savedReadings;
  }
}
