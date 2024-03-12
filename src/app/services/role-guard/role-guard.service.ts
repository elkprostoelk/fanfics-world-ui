import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole: string = route.data['expectedRole'];
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
