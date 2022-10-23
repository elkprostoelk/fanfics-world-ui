import { Component } from '@angular/core';
import { AppToastService } from "../../../services/app-toast/app-toast.service";

@Component({
  selector: 'app-toasts',
  templateUrl: './app-toasts.component.html',
  styleUrls: ['./app-toasts.component.css']
})
export class AppToastsComponent {
  toastService: AppToastService;

  constructor(
    appToastService: AppToastService) {
    this.toastService = appToastService;
  }

}
