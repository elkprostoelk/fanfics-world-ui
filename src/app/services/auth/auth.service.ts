import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from "rxjs";
import { JwtDto } from "../../dto/jwtDto";
import { HttpClient } from "@angular/common/http";
import { UserDto } from "../../dto/userDto";
import { tokenGetter } from "../../app.module";
import { environment } from "../../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUserSubject: BehaviorSubject<UserDto | undefined>;
  public loggedInUser: Observable<UserDto | undefined>;
  private readonly authRoute: string = 'auth/';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtHelper: JwtHelperService) {
    let user = this.parseJwt();
    this.loggedUserSubject = new BehaviorSubject<UserDto | undefined>(user);
    this.loggedInUser = this.loggedUserSubject.asObservable();
  }

  loginUser(login: string, password: string): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(`${environment.apiPath}${this.authRoute}login`, { login, password })
      .pipe(map(response => {
        localStorage.setItem('jwt', response.jwt);
        this.loggedUserSubject.next(this.parseJwt()!);
        return response;
      }));
  }

  registerUser(registeredUserData: {
    userName: string,
    password: string,
    email: string,
    dateOfBirth: string,
    role: string
  }): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiPath}${this.authRoute}register`, registeredUserData);
  }

  logoutUser() {
    localStorage.removeItem('jwt');
    this.loggedUserSubject.next(undefined);
  }

  get isAuthenticated(): boolean {
    let token = tokenGetter() ?? null;
    return !this.jwtHelper.isTokenExpired(token) &&
      this.loggedUserSubject.getValue() !== undefined;
  }

  isInRole(role: string): boolean {
    return this.parseJwt()?.role === role ?? false;
  }

  parseJwt(): UserDto | undefined {
    const token = tokenGetter();
    if (token) {
      const identity = JSON.parse(atob(token.split('.')[1]));
      const idClaim: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
      const nameClaim: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
      const roleClaim: string = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      const expires: Date = new Date(0);
      expires.setUTCSeconds(identity['exp']);
      return {
        id: identity[idClaim],
        userName: identity[nameClaim],
        role: identity[roleClaim],
        expires
      };
    }
    return undefined;
  }
}
