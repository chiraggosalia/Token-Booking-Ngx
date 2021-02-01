import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {switchMap ,catchError , tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(Auth.currentSession())
      .pipe(
        switchMap((auth: any) => { // switchMap() is used instead of map().

          const jwt = auth.accessToken.jwtToken;
          let with_auth_request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`
            }
          });
          return next.handle(with_auth_request).pipe(tap(() => {
            },
            (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status !== 403 && err.status !== 401) {
                  return;
                }
                this.router.navigate(['/auth/login']);
              }
            }));
        }),
        catchError((err) => {
          return next.handle(request).pipe(tap(() => {
            },
            (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status !== 403 && err.status !== 401) {
                  return;
                }
                this.router.navigate(['/auth/login']);
              }
            }));
        })
      );

  }
}
