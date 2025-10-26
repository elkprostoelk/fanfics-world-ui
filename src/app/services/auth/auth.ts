import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {LoggedInUser} from '../../models/auth/loggedInUser';
import {decodeToken} from '../../auth-interceptor/auth-interceptor';
import {RegisterRequest} from '../../models/auth/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  loggedInUser$ = new BehaviorSubject<LoggedInUser | null>(null);

  private authUrl = `${environment.apiUrl}api/auth/`;

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.authUrl}login`, {email, password}, {
      responseType: 'text'
    });
  }

  register(request: RegisterRequest) {
    return this.http.post(`${this.authUrl}register`, request);
  }

  onStartup() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return;
    }

    const user = decodeToken(token);
    if (user.expires > new Date()) {
      this.loggedInUser$.next(user as LoggedInUser);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedInUser$.next(null);
  }
}
