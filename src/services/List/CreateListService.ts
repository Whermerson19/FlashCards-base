import { AppError } from "../../errors/AppError";
import { List } from "../../models/List";

import { ListRepository } from "../../repositories/List/ListRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  title: string;
  userId: string;
}

export class CreateListService {
  async init({ title, userId }: IRequest): Promise<List> {
    const listRepository = new ListRepository();
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must to auth", 401);

    const list = await listRepository.create({
      title,
      userId,
    });

    return list;
  }
}
