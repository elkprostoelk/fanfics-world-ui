import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './components/login/login/login.component';
import { RouterModule } from "@angular/router";
import { AuthInterceptor } from "./auth-interceptor/auth.interceptor";
import { FanficsComponent } from './components/fanfics/fanfics.component';
import {JwtModule} from "@auth0/angular-jwt";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddFanficComponent } from './components/add-fanfic/add-fanfic.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { FanficPageComponent } from './components/fanfic-page/fanfic-page.component';
import {FanficItemComponent} from "./components/fanfics/fanfic-item/fanfic-item.component";
import {PaginatorModule} from "primeng/paginator";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ScrollTopModule} from "primeng/scrolltop";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FanficsWorldTagComponent} from "./components/fanfics-world-tag/fanfics-world-tag.component";
import {
  FanficsSearchFiltersComponent
} from "./components/fanfics/fanfics-search-filters/fanfics-search-filters.component";
import {EditorModule} from "primeng/editor";
import {EditFanficComponent} from "./components/edit-fanfic/edit-fanfic.component";

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FanficsComponent,
    NotFoundComponent,
    AddFanficComponent,
    BackButtonComponent,
    FanficPageComponent,
    EditFanficComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FanficItemComponent,
    DropdownModule,
    PaginatorModule,
    ScrollTopModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ButtonModule,
    ProgressSpinnerModule,
    EditorModule,
    FanficsWorldTagComponent,
    FanficsSearchFiltersComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    MessageService
  ],
  exports: [
    BackButtonComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
