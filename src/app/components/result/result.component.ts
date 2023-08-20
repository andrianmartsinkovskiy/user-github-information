import {Component, Input, OnInit} from '@angular/core';
import {faUser, faCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {GithubService} from "../../services/github.service";
import {IRepositoryInfo} from "../../models/repository-info.interface";
import {zip} from "rxjs";
import {IUserData} from "../../models/user-data.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
  ) {
  }

  isLoading = true;
  userInfo: IRepositoryInfo & IUserData
  faUser = faUser;
  faCircleLeft = faCircleLeft

  ngOnInit(): void {
    const userName = this.route.snapshot.params.name
    zip(
      this.githubService.getUserRepos(userName),
      this.githubService.getUserData(userName))
      .subscribe({
        next: (data) => {
          this.userInfo = {
            ...data[0],
            ...data[1]
          }
          this.isLoading = false
        },
        error: () => {
          this.errorService.handle("error")
          this.router.navigate(['/search'])
        }
      })
  }
}
