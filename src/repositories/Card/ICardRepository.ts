import { Card } from "../../models/Card";

export interface ICreateCardData {
  front: string;
  versus: string;
  userId: string;
  listId: string;
}

export interface ICardRepository {
  indexCards(listId: string): Promise<Card[]>;
  findById(id: string): Promise<Card | undefined>;
  create(data: ICreateCardData): Promise<Card>;
  save(card: Card): Promise<Card>;
  delete(cardId: string): Promise<void>;
}