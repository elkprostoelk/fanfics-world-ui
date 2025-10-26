import { HttpInterceptorFn } from '@angular/common/http';
import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('access_token') || '';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const router = inject(Router);

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401 && router.url !== '/login') {
        router.navigate(['/login']).then();
      }

      return throwError(() => err);
    })
  );
};

export const decodeToken = (token: string) => {
  const idClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
  const nameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
  const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  return {
    id: decodedToken[idClaim] || '',
    name: decodedToken[nameClaim] || '',
    role: decodedToken[roleClaim] || '',
    expires: new Date(parseInt(decodedToken['exp'] || '0') * 1000)
  }
}
