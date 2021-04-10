import { compare, hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { User } from "../../models/User";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  username: string;
  email: string;
  currentPassword?: string;
  changedPassword?: string;
  confirmChangedPassword?: string;
}

export class UpdateProfileService {
  async init({
    userId,
    username,
    email,
    currentPassword,
    changedPassword,
    confirmChangedPassword,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const verifyUsername = await usersRepository.findByUsername(username);
    if (verifyUsername && user.username !== username)
      throw new AppError("This username is already in use");

    const verifyEmail = await usersRepository.findByEmail(email);
    if (verifyEmail && user.email !== email)
      throw new AppError("This email is already in use");

    user.username = username;
    user.email = email;

    if (currentPassword && changedPassword && confirmChangedPassword) {
      const verifyPassword = await compare(currentPassword, user.password);
      if (!verifyPassword)
        throw new AppError("Incorrect current password", 403);

      if (changedPassword !== confirmChangedPassword)
        throw new AppError("Passwords does not match");

      const hashedPassword = await hash(changedPassword, 10);

      user.password = hashedPassword;
    }

    return usersRepository.save(user);
  }
}
