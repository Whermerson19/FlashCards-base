import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { ListAllCardsService } from "../../services/Cards/ListAllCardsService";

export class ListAllCardsController {
  async index(request: Request, response: Response): Promise<Response> {
    const service = new ListAllCardsService();

    const user_id = request.user.id;

    const cards = await service.init({
      user_id,
    });

    return response.status(200).json(classToClass(cards));
  }
}
