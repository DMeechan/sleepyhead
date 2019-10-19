import { Entity, Column, CreateDateColumn, ManyToOne, Index } from "typeorm";
import { SleepCycle } from "./SleepCycle";
import { User } from "./User";

export enum ReadingType {
  TEMPERATURE = "temperature",
  LUMINOSITY = "luminosity",
  NOISE = "noise"
}

@Entity()
export class Reading {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  value: number;

  @Column({
    type: "enum",
    enum: ReadingType
  })
  type: ReadingType;

  @CreateDateColumn()
  createdAt: Date;

  @Index()
  @ManyToOne(type => SleepCycle, sleepCycle => sleepCycle.readings)
  sleepCycle: SleepCycle;
}

export function createReading(data: {
  type: ReadingType;
  value: number;
}): Reading {
  const reading = new Reading();

  switch (data.type) {
    case "temperature":
      reading.type = ReadingType.TEMPERATURE;
      break;
    case "luminosity":
      reading.type = ReadingType.LUMINOSITY;
      break;
    case "noise":
      reading.type = ReadingType.NOISE;
      break;
    default:
      throw new Error("reading type not recognised: " + data.type);
  }

  reading.value = data.value;
  return reading;
}
