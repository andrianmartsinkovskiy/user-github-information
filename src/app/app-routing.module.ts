import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./components/search/search.component";
import {ResultComponent} from "./components/result/result.component";

const routes: Routes = [
  {path: "", redirectTo: "search", pathMatch: "full"},
  {path: "search", component: SearchComponent},
  {path: "result/:name", component: ResultComponent},
  {path: '**', redirectTo: "search"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
