import { AppError } from "../../errors/AppError";
import { FoldersRepository } from "../../repositories/Folder/FoldersRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  folderId: string;
}

export class DeleteFolderService {
  async init({ userId, folderId }: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();
    const foldersRepository = new FoldersRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const folder = await foldersRepository.findById(folderId);
    if (!folder) throw new AppError("Folder not found", 404);

    if (folder.userId !== userId)
      throw new AppError("Unauthorizated operation", 403);

    await foldersRepository.delete(folderId);
  }
}
