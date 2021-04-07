import { User } from "../../models/User";

export interface ICreateUserData {
  username: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserData): Promise<User>;
  save(user: User): Promise<User>;
}