import { UsersToken } from "../../models/UsersToken";

export interface IUsersTokenRepository {
  findByToken(token: string): Promise<UsersToken | undefined>;
  create(userId: string): Promise<UsersToken>;
}