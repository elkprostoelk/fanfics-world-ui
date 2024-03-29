import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
