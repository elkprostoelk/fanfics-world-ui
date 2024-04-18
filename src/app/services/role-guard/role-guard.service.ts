import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService  {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
    ) { }

  canActivate(expectedRole: string): boolean {
    const user = this.authService.parseJwt();

    if (!this.authService.isAuthenticated ||
      user?.role !== expectedRole
    ) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
