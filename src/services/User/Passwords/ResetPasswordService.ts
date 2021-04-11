import { hash } from "bcryptjs";
import { AppError } from "../../../errors/AppError";
import { User } from "../../../models/User";
import { UsersRepository } from "../../../repositories/User/UsersRepository";
import { UsersTokenRepository } from "../../../repositories/UsersToken/UsersTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  async init({ token, password }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const usersTokenRepository = new UsersTokenRepository();

    const userToken = await usersTokenRepository.findByToken(token);
    if (!userToken) throw new AppError("Invalid token", 404);

    const user = await usersRepository.findById(userToken.userId);
    if (!user) throw new AppError("This user does not exist", 404);

    const createdAtToken = userToken.createdAt;
    const currentDate = new Date(Date.now());

    if (currentDate.getHours() - createdAtToken.getHours() > 1)
      throw new AppError("Expired token");

    const hashedPassword = await hash(password, 10);

    user.password = hashedPassword;

    return usersRepository.save(user);
  }
}
