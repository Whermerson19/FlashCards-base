import { getRepository, Repository } from "typeorm";
import { Folder } from "../../models/Folder";
import { IFoldersRepository, ICreateFolderData } from "./IFoldersRepository";

export class FoldersRepository implements IFoldersRepository {
  private ormRepository: Repository<Folder>;

  constructor() {
    this.ormRepository = getRepository(Folder);
  }

  async indexFolders(userId: string): Promise<Folder[]> {
    const folders = await this.ormRepository.find({
      where: {
        userId,
      },
    });

    return folders;
  }

  async findById(id: string): Promise<Folder | undefined> {
    const folder = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return folder;
  }

  async findByTilte(title: string): Promise<Folder | undefined> {
    const folder = await this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return folder;
  }

  async create({ userId, title }: ICreateFolderData): Promise<Folder> {
    const folder = this.ormRepository.create({
      userId,
      title,
    });

    return this.ormRepository.save(folder);
  }

  async save(folder: Folder): Promise<Folder> {
    return this.ormRepository.save(folder);
  }

  async delete(folderId: string): Promise<void> {
    await this.ormRepository.delete(folderId);
  }
}
