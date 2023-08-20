export interface IUserInfo {
  name: string,
  avatar: string,
  public_repos: number,
  created_at: string,
  repos: Record<string, any>[],
  languages: Record<string, any>[]
}
