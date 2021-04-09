import { AppError } from "../../errors/AppError";
import { Card } from "../../models/Card";
import { CardRepository } from "../../repositories/Card/CardRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  cardId: string;
  front: string;
  versus: string;
}

export class UpdateCardSerice {
  async init({ userId, cardId, front, versus }: IRequest): Promise<Card> {
    const usersRepository = new UsersRepository();
    const cardsRepository = new CardRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const card = await cardsRepository.findById(cardId);
    if (!card) throw new AppError("Card not found", 404);

    if (card.userId !== userId)
      throw new AppError("Unauthorizated operation", 403);

    card.front = front;
    card.versus = versus;

    return cardsRepository.save(card);
  }
}
