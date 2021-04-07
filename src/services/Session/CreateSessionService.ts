import {User} from '../../models/User'

import { UsersRepository } from '../../repositories/User/UsersRepository'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import authConfig from '../../config/auth'
import { AppError } from '../../errors/AppError'

interface IResponse {
  token: string;
  user: User;
}

interface IRequest {
  loginField: string;
  password: string;
}

export class CreateSessionService {
  async init({ loginField, password }: IRequest): Promise<IResponse> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByUsernameEmail(loginField);
    if (!user) throw new AppError("Invalid credentials");

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) throw new AppError("Invalid credentials");

    const token = sign({}, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
      subject: user.id,
    });

    return {
      user,
      token
    }

  }
}