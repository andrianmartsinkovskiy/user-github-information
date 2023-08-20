import {Component, Input} from '@angular/core';
import {IRepository} from "../../models/repository.interface";
import {faLink, faUser} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent {
  @Input() repository: IRepository
  faLink = faLink
  protected readonly faUser = faUser;
}
