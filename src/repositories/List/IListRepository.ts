import { List } from '../../models/List'

export interface ICreateListData {
  title: string;
  userId: string;
}

export interface IListRepository {
  findById(id: string): Promise<List | undefined>;
  create(data: ICreateListData): Promise<List>;
  save(list: List): Promise<List>;
}