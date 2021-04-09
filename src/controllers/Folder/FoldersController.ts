import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateFolderService } from "../../services/Folders/CreateFolderService";
import { DeleteFolderService } from "../../services/Folders/DeleteFolderService";
import { IndexFolderService } from "../../services/Folders/IndexFolderService";
import { UpdateFolderService } from "../../services/Folders/UpdateFolderService";

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

  async update(request: Request, response: Response): Promise<Response> {
    const service = new UpdateFolderService();

    const userId = request.user.id;
    const { folderId } = request.params;

    const { title } = request.body;

    const folder = await service.init({
      userId,
      folderId,
      title,
    });

    return response.status(201).json(classToClass(folder));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const service = new DeleteFolderService();

    const userId = request.user.id;
    const { folderId } = request.params;

    await service.init({
      userId,
      folderId,
    });

    return response
      .status(200)
      .json({ success: "Deleted folder successfully" });
  }
}
