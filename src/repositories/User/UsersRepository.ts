import { User } from "../../models/User";
import { Repository, getRepository } from "typeorm";

import { IUsersRepository, ICreateUserData } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create({ username, email, password }: ICreateUserData): Promise<User> {
    const user = this.ormRepository.create({
      username,
      email,
      password,
    });

    return this.ormRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
