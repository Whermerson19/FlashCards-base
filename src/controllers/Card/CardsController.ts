import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateCardService } from "../../services/Cards/CreateCardService";
import { IndexCardService } from "../../services/Cards/IndexCardService";

export class CardsController {
  async index(request: Request, response: Response): Promise<Response> {
    const service = new IndexCardService();

    const userId = request.user.id;
    const { listId, page } = request.params;

    const cards = await service.init({
      userId,
      listId,
      page: Number(page)
    });

    return response.status(200).json(classToClass(cards));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const service = new CreateCardService();

    const userId = request.user.id;
    const { listId } = request.params;

    const { front, versus } = request.body;

    const card = await service.init({
      userId,
      listId,
      front,
      versus,
    });

    return response.status(201).json(classToClass(card));
  }
}
