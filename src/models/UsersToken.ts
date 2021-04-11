import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usersToken')
export class UsersToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('uuid')
  @Column()
  token: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}