import { AppError } from "../../errors/AppError";
import { User } from "../../models/User";

import { hash } from "bcryptjs";

import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export class CreateUserService {
  async init({
    username,
    email,
    password,
    confirm_password,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const checkUsername = await usersRepository.findByUsername(username);
    const checkEmail = await usersRepository.findByEmail(email);

    if (checkUsername && !checkEmail)
      throw new AppError("This username is already in use");

    if (!checkUsername && checkEmail)
      throw new AppError("This email is already in use");

    if (checkUsername && checkEmail)
      throw new AppError("This username and email are already in use");

    if (confirm_password !== password)
      throw new AppError("Passwords does not match");

    const hasedPassoword = await hash(password, 10);

    const user = await usersRepository.create({
      username,
      email,
      password: hasedPassoword,
    });

    return user;
  }
}
