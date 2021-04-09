import { AppError } from "../../errors/AppError";
import { Folder } from "../../models/Folder";
import { FoldersRepository } from "../../repositories/Folder/FoldersRepository";
import { UsersRepository } from "../../repositories/User/UsersRepository";

interface IRequest {
  userId: string;
  title: string;
}

export class CreateFolderService {
  async init({ userId, title }: IRequest): Promise<Folder> {
    const usersRepository = new UsersRepository();
    const foldersRepository = new FoldersRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError("You must authenticate first", 401);

    const folders = await foldersRepository.indexFolders(userId);

    const verifyFoldersTitle = folders.some(
      (folder) => folder.title === title
    );

    if (verifyFoldersTitle)
      throw new AppError("You already have a folder with that title");

    const folder = await foldersRepository.create({
      userId,
      title,
    });

    return folder;
  }
}
