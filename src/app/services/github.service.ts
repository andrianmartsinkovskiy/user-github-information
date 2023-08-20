import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {IRepositoryInfo} from "../models/repository-info.interface";
import {IUserData} from "../models/user-data.interface";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getUserData(name: string): Observable<IUserData> {
    return this.http.get<any>("https://api.github.com/users/" + name)
      .pipe(
        map(item => {
          return {
            name: item.login,
            avatar: item.avatar,
            created_at: item.created_at,
            public_repos: item.public_repos,
            yearsInService: (2023 - new Date(item.created_at).getFullYear()) + 1
          }
        })
      )
  }

  getUserRepos(name: string): Observable<IRepositoryInfo> {
    return this.http.get<Record<string, any>[]>(`https://api.github.com/users/${name}/repos`)
      .pipe(
        switchMap(reposData => {
          const namesArr = reposData.map((item: Record<string, any>) => item.name)
          return this.getReposLanguages(name, namesArr)
            .pipe(
              map(reposLanguageData => {
                return this.transformReposData(reposData, reposLanguageData)
              })
            )
        })
      )
  }

  transformReposData(repos: Record<string, any>[], languages: Record<string, any>[]) {
    let allLanguagesCount: number = 0
    let languagesPercent: number
    const languagesObject: Record<string, any> = {}
    const repoAllLanguagesCount: number[] = []

    // count languages
    languages.forEach((item, index) => {
      Object.keys(item).map((key) => {
        allLanguagesCount += item[key]

        // count repo languages count
        !repoAllLanguagesCount[index]
          ? repoAllLanguagesCount[index] = item[key]
          :  repoAllLanguagesCount[index] += item[key]

        if (languagesObject[key]) {
          languagesObject[key] += item[key]
        } else {
          languagesObject[key] = item[key]
        }
      })
    })

    // get one percent
    languagesPercent = 100 / allLanguagesCount

    const topLanguages = Object.keys(languagesObject)
      .map(key => {
        return {
          key: key,
          value: languagesObject[key],
          percent: Math.round(languagesObject[key] * languagesPercent)
        }
      })
      .sort((a, b) => b.value - a.value)
      .filter((item, index) => index < 3)


    const newReposData = repos.map((item, index) => {
      return {
        name: item.name,
        link: item.html_url,
        created_at: item.created_at ?? "",
        updated_at: item.updated_at ?? "",
        languages: Object.keys(languages[index])
          .map((key: string) => {
            return {
              key: key,
              value: languages[index][key],
              percent: Math.round(100 / repoAllLanguagesCount[index] * languages[index][key])
            }
          })
      }
    })

    return {
      languages: topLanguages,
      repos: newReposData
    }
  }

  getReposLanguages(name: string, repos: string[]): Observable<any> {
    const links = repos.map(item => {
      return this.http.get<any>(`https://api.github.com/repos/${name}/${item}/languages`)
    })

    return forkJoin(links)
  }
}
