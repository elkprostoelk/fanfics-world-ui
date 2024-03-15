import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.less']
})
export class BackButtonComponent {

  constructor(private readonly router: Router) { }

  routeBack() {
    this.router.navigateByUrl('/');
  }
}
