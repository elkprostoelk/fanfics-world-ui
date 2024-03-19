import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

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
    FanficPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
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
    ButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
