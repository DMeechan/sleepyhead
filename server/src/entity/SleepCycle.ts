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

  @Column()
  quality: number;

  @Index()
  @CreateDateColumn()
  createdAt: string;

  @Index()
  @Column()
  endedAt: string;

  @Index()
  @ManyToOne(type => User, user => user.sleepCycles)
  user: User;

  @OneToMany(type => Reading, reading => reading.sleepCycle)
  readings: Reading[];
}
