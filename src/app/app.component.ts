import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AppToastService } from "./services/app-toast/app-toast.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private toastService: AppToastService;

  constructor(
    public translate: TranslateService,
    appToastService: AppToastService) {
    this.toastService = appToastService;
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
