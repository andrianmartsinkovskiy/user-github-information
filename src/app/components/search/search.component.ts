import {Component} from '@angular/core';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(
    private router: Router
  ) {
  }

  faMagnifyingGlass = faMagnifyingGlass
  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ])
  })

  get name() {
    return this.form.controls.name as FormControl
  }

  submit(): void {
    if (this.name.errors) return
    this.router.navigate(['/result/' + this.name.value] )
  }
}
