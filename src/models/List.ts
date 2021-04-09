import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Folder } from "./Folder";
import { User } from "./User";

@Entity("list")
export class List {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  folderId?: string | null;

  @ManyToOne(() => Folder, { eager: true })
  @JoinColumn({ name: "folderId" })
  folder: Folder;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
