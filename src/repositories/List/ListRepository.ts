import { List } from '../../models/List';
import { Repository, getRepository } from 'typeorm'

import { IListRepository, ICreateListData } from './IListRepository'

export class ListRepository implements IListRepository {
  private ormRepository: Repository<List>;

  constructor() {
    this.ormRepository = getRepository(List);
  }

  async findById(id: string): Promise<List | undefined> {
    const list = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    return list;
  }

  async create({ title, userId }: ICreateListData): Promise<List> {
    const list = this.ormRepository.create({
      title,
      userId
    });

    return this.ormRepository.save(list);
  }

  async save(list: List): Promise<List> {
    return this.ormRepository.save(list);
  }
}