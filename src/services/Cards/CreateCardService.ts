import { AppError } from "../../errors/AppError";
import { Card } from "../../models/Card";
import { CardRepository } from "../../repositories/Card/CardRepository";
import { ListRepository } from "../../repositories/List/ListRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  listId: string;
  front: string;
  versus: string;
}

export class CreateCardService {
  async init({ userId, listId, front, versus }: IRequest): Promise<Card> {
    const usersRepository = new UsersRepository()
    const cardsRepository = new CardRepository()
    const listRepository = new ListRepository()

    const user = await usersRepository.findById(userId)
    if (!user) throw new AppError("You must authenticate first", 401);

    const list = await listRepository.findById(listId)
    if (!list) throw new AppError("List not found", 404);

    if (list.userId !== userId)
      throw new AppError("Unauthorizated operation", 403);

    const card = await cardsRepository.create({
      userId,
      listId,
      front,
      versus
    });

    return card;

  }
}