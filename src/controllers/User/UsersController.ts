import { Request, Response } from "express";
import { classToClass } from "class-transformer";
import { CreateUserService } from "../../services/User/CreateUserService";

export class UsersControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const service = new CreateUserService();

    const { username, email, password, confirm_password } = request.body;

    const user = await service.init({
      username,
      email,
      password,
      confirm_password,
    });

    return response.status(201).json(classToClass(user));
  }
}
