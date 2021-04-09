import { AppError } from "../../errors/AppError";
import { Folder } from "../../models/Folder";
import { FoldersRepository } from "../../repositories/Folder/FoldersRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  folderId: string;
  title: string;
}

export class UpdateFolderService {
  async init({ userId, folderId, title }: IRequest): Promise<Folder> {
    const usersRepository = new UsersRepository();
    const foldersRepository = new FoldersRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const folder = await foldersRepository.findById(folderId);
    if (!folder) throw new AppError("Folder not found", 404);

    if (folder.userId !== userId)
      throw new AppError("Unauthorizated operation", 403);

    folder.title = title;

    return foldersRepository.save(folder);
  }
}
