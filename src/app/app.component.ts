import {Component, OnInit} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  constructor(
    public translate: TranslateService,
    readonly authService: AuthService,
    private readonly router: Router) {}

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  get userLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/login');
  }
}
