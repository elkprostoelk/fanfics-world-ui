import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AppToastService } from "./services/app-toast/app-toast.service";
import { AuthService } from "./services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  private toastService: AppToastService;

  constructor(
    public translate: TranslateService,
    appToastService: AppToastService,
    readonly authService: AuthService,
    private readonly router: Router) {
    this.toastService = appToastService;
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
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
