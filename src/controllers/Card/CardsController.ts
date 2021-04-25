import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateCardService } from "../../services/Cards/CreateCardService";
import { DeleteCardService } from "../../services/Cards/DeleteCardService";
import { IndexCardService } from "../../services/Cards/IndexCardService";
import { UpdateCardSerice } from "../../services/Cards/UpdateCardSerice";

export class CardsController {
  async index(request: Request, response: Response): Promise<Response> {
    const service = new IndexCardService();

    const userId = request.user.id;
    const { listId } = request.params;

    const cards = await service.init({
      userId,
      listId,
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

  async update(request: Request, response: Response): Promise<Response> {
    const service = new UpdateCardSerice();

    const userId = request.user.id;
    const { cardId } = request.params;

    const { front, versus } = request.body;

    const card = await service.init({
      userId,
      cardId,
      front,
      versus,
    });

    return response.status(201).json(classToClass(card));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const service = new DeleteCardService();

    const userId = request.user.id;
    const { cardId } = request.params;

    await service.init({
      userId,
      cardId,
    });

    return response.status(200).json({ success: "Deleted card successfully" });
  }
}
