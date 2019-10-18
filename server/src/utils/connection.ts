import "reflect-metadata";

import { createConnection as createDbConnection, getConnection } from "typeorm";
import { databaseUrl } from "./situation";
import { User } from "../entity/User";
import { SleepCycle } from "../entity/SleepCycle";
import { Reading } from "../entity/Reading";

export const createConnection = async (): Promise<void> => {
  await createDbConnection({
    type: "postgres",
    url: databaseUrl,
    entities: [SleepCycle, Reading, User],
    subscribers: [],
    synchronize: true,
    logging: false,
    ssl: true
  });
};

export const closeConnection = async (): Promise<void> => {
  await getConnection().close();
};
