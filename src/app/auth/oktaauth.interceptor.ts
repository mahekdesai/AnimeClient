import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './oktaauth.service';

export const oktaauthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const authToken = localStorage.getItem('tokenKey');
  const router = inject(Router);
  if(authToken){
    const newReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${authToken}`
      }
    });
    return next(newReq);
  }
  return next(req).pipe(
    catchError(error => 
      {
        if(error instanceof HttpErrorResponse && error.status === 401){
          authService.login();
        }
        return throwError(() => error);
      }
    )
  );
};