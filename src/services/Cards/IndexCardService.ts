import { AppError } from "../../errors/AppError";
import { Card } from "../../models/Card";
import { CardRepository } from "../../repositories/Card/CardRepository";
import { ListRepository } from "../../repositories/List/ListRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  listId: string;
}

export class IndexCardService {
  async init({ userId, listId }: IRequest): Promise<Card[]> {
    const usersRepository = new UsersRepository();
    const listRepository = new ListRepository();
    const cardsRepository = new CardRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const list = await listRepository.findById(listId);
    if (!list) throw new AppError("List not found", 404);

    const cards = await cardsRepository.indexCards(listId);
    console.log(cards.length)
    return cards;
  }
}
