import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateFolderService } from "../../services/Folders/CreateFolderService";

export class FoldersController {
  async create(request: Request, response: Response): Promise<Response> {
    const service = new CreateFolderService();

    const userId = request.user.id;
    const { title } = request.body;

    const folder = await service.init({
      userId,
      title,
    });

    return response.status(201).json(classToClass(folder));
  }
}
