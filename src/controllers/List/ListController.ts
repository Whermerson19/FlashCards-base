import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateListService } from "../../services/List/CreateListService";
import { IndexListerService } from "../../services/List/IndexListerService";
import { UpdateListService } from "../../services/List/UpdateListService";

export class ListController {
  async index(request: Request, response: Response): Promise<Response> {
    const service = new IndexListerService();

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

    const list = await service.init({
      userId,
      title,
    });

    return response.status(201).json(classToClass(list));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const service = new UpdateListService();

    const userId = request.user.id
    const { listId } = request.params
    
    const { title } = request.body;

    const list = await service.init({
      userId,
      listId,
      title
    });

    return response.status(201).json(classToClass(list))
  }
}
