import {
  Entity,
  Column,
  ManyToOne,
  Generated,
  CreateDateColumn,
  Index,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Reading } from "./Reading";

@Entity()
export class SleepCycle {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ nullable: true, default: 0 })
  quality: number;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @Index()
  @Column({ nullable: true, type: Date })
  endedAt: Date;

  @Index()
  @ManyToOne(type => User, user => user.sleepCycles)
  user: User;

  @OneToMany(type => Reading, reading => reading.sleepCycle)
  readings: Reading[];
}

export function createSleepCycle(user: User) {
  const cycle = new SleepCycle();
  cycle.user = user;
  cycle.quality = 0;
  return cycle;
}
