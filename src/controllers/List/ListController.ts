import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import { IndexListService } from "../../services/List/IndexListService";
import { CreateListService } from "../../services/List/CreateListService";
import { UpdateListService } from "../../services/List/UpdateListService";
import { DeleteListService } from "../../services/List/DeleteListService";

export class ListController {
  async index(request: Request, response: Response): Promise<Response> {
    const service = new IndexListService();

    const userId = request.user.id;

    const index = await service.init({
      userId,
    });

    return response.status(200).json(classToClass(index));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const service = new CreateListService();

    const userId = request.user.id;
    const { title } = request.body;
    const { folderId } = request.query;

    const list = await service.init({
      userId,
      title,
      folderId: folderId? String(folderId) : null,
    });

    return response.status(201).json(classToClass(list));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const service = new UpdateListService();

    const userId = request.user.id;
    const { listId } = request.params;

    const { title } = request.body;

    const list = await service.init({
      userId,
      listId,
      title,
    });

    return response.status(201).json(classToClass(list));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const service = new DeleteListService();

    const userId = request.user.id;
    const { listId } = request.params;

    await service.init({
      userId,
      listId,
    });

    return response.status(200).json({ success: "Deleted list successfully" });
  }
}
