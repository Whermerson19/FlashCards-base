import { AppError } from "../../errors/AppError";
import { Folder } from "../../models/Folder";
import { FoldersRepository } from "../../repositories/Folder/FoldersRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
}

export class IndexFolderService {
  async init({ userId }: IRequest): Promise<Folder[]> {
    const usersRepository = new UsersRepository();
    const foldersRepository = new FoldersRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const folders = await foldersRepository.indexFolders(userId);
    const verifyUser = folders.every((folder) => folder.userId === userId);

    if (!verifyUser) throw new AppError("Unauthorizated Operation", 403);

    return folders;
  }
}
