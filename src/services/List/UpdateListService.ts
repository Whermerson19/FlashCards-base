import { AppError } from "../../errors/AppError";
import { List } from "../../models/List";
import { ListRepository } from "../../repositories/List/ListRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  title: string;
  listId: string;
}

export class UpdateListService {
  async init({ userId, title, listId }: IRequest): Promise<List> {
    const usersRepository = new UsersRepository();
    const listRepository = new ListRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const list = await listRepository.findById(listId);
    if (!list) throw new AppError("List not found", 404);

    if (list.userId !== userId)
      throw new AppError("Unauthorizated operation", 403);

    list.title = title;

    return listRepository.save(list);
  }
}
