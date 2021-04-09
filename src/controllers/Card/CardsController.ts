import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateCardService } from "../../services/Cards/CreateCardService";

export class CardsController {
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
