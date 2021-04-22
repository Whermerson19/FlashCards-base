import { AppError } from "../../errors/AppError";
import { Card } from "../../models/Card";
import { CardRepository } from "../../repositories/Card/CardRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  user_id: string;
}

export class ListAllCardsService {
  async init({user_id}: IRequest): Promise<Card[]> {
    const usersRepository = new UsersRepository()
    const cardsRepository = new CardRepository()

    const user = await usersRepository.findById(user_id);
    if (!user) throw new AppError("You must authenticate first", 401);

    const cards = await cardsRepository.listAll(user_id);

    return cards;
  }
}