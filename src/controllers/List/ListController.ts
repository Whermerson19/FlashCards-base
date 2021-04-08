import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateListService } from "../../services/List/CreateListService";

export class ListController {
  async create(request: Request, response: Response): Promise<Response> {
    const service = new CreateListService();

    const userId = request.user.id;
    const { title } = request.body;

    const list = await service.init({
      userId,
      title,
    });

    return response.status(201).json(classToClass(list));
  }
}
