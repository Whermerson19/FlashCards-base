import { AppError } from "../../errors/AppError";
import { List } from "../../models/List";
import { ListRepository } from "../../repositories/List/ListRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
}

export class IndexListService {
  async init({ userId }: IRequest): Promise<List[]> {
    const usersRepository = new UsersRepository();
    const listRepository = new ListRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const index = await listRepository.indexLists(userId);

    return index ? index : [];
  }
}
