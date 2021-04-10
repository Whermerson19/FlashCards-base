import { AppError } from "../../errors/AppError";
import { User } from "../../models/User";
import { StorageProvider } from "../../providers/StorageProvider";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  avatar: string;
}

export class UpdateAvatarService {
  async init({ userId, avatar }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const storageProvider = new StorageProvider();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    if (user.avatar) await storageProvider.deleteFile(user.avatar);

    const file = await storageProvider.saveFile(avatar);

    user.avatar = file;

    return usersRepository.save(user);
  }
}
