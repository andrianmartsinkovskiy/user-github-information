import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { SearchComponent } from './components/search/search.component';
import { ResultComponent } from './components/result/result.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RepositoryComponent } from './components/repository/repository.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalErrorComponent,
    SearchComponent,
    ResultComponent,
    RepositoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
