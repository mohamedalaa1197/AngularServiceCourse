import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddHeaderService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(`AddHeaderInterceptor ${req.url}`);

    let clonedRequest:HttpRequest<any>=req.clone({
      setHeaders:{'Content-Type':'application/json'}
    });
    return next.handle(clonedRequest);
  }
}
