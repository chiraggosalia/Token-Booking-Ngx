import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.jwt) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.jwt}`
        }
      });
    }
console.log("not gooddddddddd");
    return next.handle(request).pipe( tap(() => {
      console.log("in no error magic");
      },
      (err: any) => {
      console.log("interceptor" + request);
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 403 && err.status !== 401) {
            console.log("in magic");
            return;
          }
          console.log("magic!!!");
          this.router.navigate(['/auth/login']);
        }
      }));
  }
}
