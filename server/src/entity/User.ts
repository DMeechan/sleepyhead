import {
  Entity,
  Column,
  CreateDateColumn,
  Generated,
  Index,
  OneToMany
} from "typeorm";
import { SleepCycle } from "./SleepCycle";

@Entity()
export class User {
  @Column({ primary: true })
  id: number;

  @Column()
  @Index()
  @Generated("uuid")
  uuid: string;

  @Column({ type: "varchar", length: 64, unique: true })
  username: string;

  @Column({ default: false })
  isSleeping: boolean;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(type => SleepCycle, sleepCycle => sleepCycle.user)
  sleepCycles: SleepCycle[];
}

export function createUser(data: { username: string }) {
  const user = new User();
  user.username = data.username;
  user.isSleeping = false;

  return user;
}
