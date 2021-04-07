import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import { CreateSessionService } from "../../services/Session/CreateSessionService";

export class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const service = new CreateSessionService();

    const { loginField, password } = request.body;

    const data = await service.init({
      loginField,
      password,
    });

    return response.status(201).json(classToClass(data));
  }
}
