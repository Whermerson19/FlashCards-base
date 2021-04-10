import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import { UpdateAvatarService } from "../../services/User/UpdateAvatarService";

export class UpdateAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const service = new UpdateAvatarService();

    const userId = request.user.id;
    const avatar = request.file.filename;

    const user = await service.init({
      userId,
      avatar,
    });

    return response.status(200).json(classToClass(user));
  }
}
