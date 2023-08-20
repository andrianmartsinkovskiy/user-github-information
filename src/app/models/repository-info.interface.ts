import {IRepository} from "./repository.interface";

export interface IRepositoryInfo  {
  repos: IRepository[],
  languages: Record<string, any>[]
}
