import { Folder } from "../../models/Folder";

export interface ICreateFolderData {
  title: string;
  userId: string;
}

export interface IFoldersRepository {
  indexFolders(userId: string, page: number): Promise<Folder[]>;
  findById(id: string): Promise<Folder | undefined>;
  findByTilte(title: string): Promise<Folder | undefined>;
  create(data: ICreateFolderData): Promise<Folder>;
  save(folder: Folder): Promise<Folder>;
  delete(folderId: string): Promise<void>;
}