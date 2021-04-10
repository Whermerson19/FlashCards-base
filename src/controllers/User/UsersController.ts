import { Request, Response } from "express";
import { classToClass } from "class-transformer";
import { CreateUserService } from "../../services/User/CreateUserService";
import { UpdateProfileService } from "../../services/User/UpdateProfileService";

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

  async update(request: Request, response: Response): Promise<Response> {
    const service = new UpdateProfileService();

    const userId = request.user.id;
    const {
      username,
      email,
      currentPassword,
      changedPassword,
      confirmChangedPassword,
    } = request.body;

    const user = await service.init({
      userId,
      username,
      email,
      currentPassword,
      changedPassword,
      confirmChangedPassword,
    });

    return response.status(201).json(classToClass(user));
  }
}
