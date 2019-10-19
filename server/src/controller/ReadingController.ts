import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Reading, createReading } from "../entity/Reading";
import { SleepCycle } from "../entity/SleepCycle";
import { throwError } from "../utils/httpErrors";

export class ReadingController {
  private readingRepository = getRepository(Reading);

  async save(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const readingData = req.body;
    if (!readingData.type || readingData.value === undefined) {
      throwError(next, 400, "invalid reading type or value");
    }

    const reading = createReading(readingData);

    // Get the user
    // const user = this.userRepository.findOne({
    //   where: {
    //     uuid
    //   }
    // });

    // Get the user's latest sleepcycle
    const currentSleepCycle = null;

    // get actual one

    if (!currentSleepCycle) {
      res.status(409).send("User is not sleeping");
      return;
    }

    reading.sleepCycle = currentSleepCycle;
    console.log("Adding reading to user", uuid, " : ", reading);

    const savedReading = await this.readingRepository.save(reading);
    return savedReading;
  }
}
