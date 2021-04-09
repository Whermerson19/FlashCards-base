import { getRepository, Repository } from "typeorm";
import { Card } from "../../models/Card";
import { ICardRepository, ICreateCardData } from "./ICardRepository";

export class CardRepository implements ICardRepository {
  private ormRepository: Repository<Card>;

  constructor() {
    this.ormRepository = getRepository(Card);
  }

  async indexCards(listId: string, page: number): Promise<Card[]> {
    const index = await this.ormRepository.find({
      where: {
        listId,
      },
      take: 5,
      skip: page * 5 - 5
    });

    return index;
  }

  async findById(id: string): Promise<Card | undefined> {
    const card = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return card;
  }

  async create({ listId, userId, front, versus }: ICreateCardData): Promise<Card> {
    const card = this.ormRepository.create({
      listId,
      userId,
      front,
      versus
    });

    return this.ormRepository.save(card);
  }

  async save(card: Card): Promise<Card> {
    return this.ormRepository.save(card);
  }

  async delete(cardId: string): Promise<void> {
    await this.ormRepository.delete(cardId);
  }
}