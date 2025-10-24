import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('access_token') || '';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const isTokenValid = authToken && decodeToken(authToken).expires < new Date();
  return next(isTokenValid ? authReq : req);
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
