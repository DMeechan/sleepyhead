import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
  Repository
} from "typeorm";
import { SleepCycle } from "./SleepCycle";

export enum ReadingType {
  TEMPERATURE = "temperature",
  TVOC = "tvoc", // air quality
  ECO2 = "eco2", // air quality
  NOISE = "noise",
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

export function createReading(type: ReadingType, value: number): Reading {
  const reading = new Reading();
  reading.type = type;
  reading.value = value;
  return reading;
}

function getAverage(array: number[]) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }

  const average = sum / array.length;

  return Math.round(average);
}

export async function getReadingsForCycle(
  repository: Repository<Reading>,
  sleepCycle: SleepCycle
) {
  return repository
    .createQueryBuilder("reading")
    .innerJoin("reading.sleepCycle", "sleepCycle")
    .addSelect("sleepCycle.id")
    .where("sleepCycle.id = :sleepCycleId", {
      sleepCycleId: sleepCycle.id
    })
    .getMany();
}

export function getQualityScores(
  readings: Reading[]
): { quality: number; factors: object } {
  // Get every reading score
  let scores: { [key: string]: number[] } = {
    temperature: [],
    tvoc: [],
    eco2: [],
    noise: [],
    ir: [],
    blue: [],
    luminance: [],
    uv: []
  };

  readings.forEach(reading => {
    scores["temperature"].push(reading.value);
  });

  // Calculate average score for each factor
  const factors: { [key: string]: number } = {
    temperature: getAverage(scores["temperature"]) || 0,
    tvoc: getAverage(scores["tvoc"]) || 0,
    eco2: getAverage(scores["eco2"]) || 0,
    noise: getAverage(scores["noise"]) || 0,
    ir: getAverage(scores["ir"]) || 0,
    blue: getAverage(scores["blue"]) * 10 || 0,
    luminance: getAverage(scores["luminance"]) || 0,
    uv: getAverage(scores["uv"]) || 0
  };

  // Calculate overall quality score
  const quality = getAverage(Object.values(factors)) || 0;

  return { quality, factors };
}
