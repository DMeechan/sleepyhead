import { Entity, Column, CreateDateColumn, ManyToOne, Index } from "typeorm";
import { SleepCycle } from "./SleepCycle";

export enum ReadingType {
  TEMPERATURE = "temperature",
  TVOC = "tvoc", // air quality
  ECO2 = "eco2", // air quality
  IR = "ir", // light
  BLUE = "blue", // light
  LUMINANCE = "luminance", // light
  UV = "uv" // light
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
  reading.type = data.type;
  reading.value = data.value;
  return reading;
}
