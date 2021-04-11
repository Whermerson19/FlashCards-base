import { getRepository, Repository } from "typeorm";
import { UsersToken } from "../../models/UsersToken";
import { IUsersTokenRepository } from "./IUsersTokenRepository";

export class UsersTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UsersToken>;

  constructor() {
    this.ormRepository = getRepository(UsersToken);
  }

  async findByToken(token: string): Promise<UsersToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  async create(userId: string): Promise<UsersToken> {
    const token = this.ormRepository.create({
      userId,
    });

    return this.ormRepository.save(token);
  }
}
