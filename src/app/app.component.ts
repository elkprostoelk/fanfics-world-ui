import {Component, OnInit} from '@angular/core';
import { AuthService } from "./services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit{
  constructor(
    readonly authService: AuthService,
    private readonly router: Router) {}

  ngOnInit() {
  }

  get userLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/login');
  }
}
