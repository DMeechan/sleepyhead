import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Reading, createReading } from "../entity/Reading";
import { SleepCycle } from "../entity/SleepCycle";

export class ReadingController {
  private readingRepository = getRepository(Reading);

  async save(req: Request, res: Response) {
    const { uuid } = req.query;
    const readingData = req.body;

    const reading = createReading(readingData);

    // Get the user
    // const user = this.userRepository.findOne({
    //   where: {
    //     uuid
    //   }
    // });

    // Get the user's latest sleepcycle
    const currentSleepCycle = new SleepCycle();
    // get actual one

    if (!currentSleepCycle) {
      res.status(409).send("User is not sleeping");
      return;
    }

    reading.sleepCycle = currentSleepCycle;
    console.log(
      "Adding reading to user",
      uuid,
      " : ",
      currentSleepCycle.uuid,
      " : ",
      reading
    );

    const savedReading = await this.readingRepository.save(reading);
    return savedReading;
  }
}
