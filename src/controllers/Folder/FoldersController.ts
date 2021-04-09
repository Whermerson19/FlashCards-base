import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateFolderService } from "../../services/Folders/CreateFolderService";
import { IndexFolderService } from "../../services/Folders/IndexFolderService";

export class FoldersController {
  async index(request: Request, response: Response): Promise<Response> {
    const service = new IndexFolderService();

    const userId = request.user.id;

    const folders = await service.init({
      userId,
    });

    return response.status(200).json(classToClass(folders));
  }

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
