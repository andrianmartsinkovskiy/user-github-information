export interface IRepository {
  name: string,
  link: number,
  created_at: string,
  updated_at: string,
  languages: Record<string, any>[]
}
