import { AppError } from "../../errors/AppError";
import { CardRepository } from "../../repositories/Card/CardRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  cardId: string;
}

export class DeleteCardService {
  async init({ userId, cardId }: IRequest): Promise<void> {
    const usersRepository = new UsersRepository()
    const cardsRepository = new CardRepository()

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const card = await cardsRepository.findById(cardId);
    if (!card) throw new AppError("Card not found", 404);

    if (card.userId !== userId)
      throw new AppError("Unauthorizated operation", 403);

    await cardsRepository.delete(cardId);
  }
}