import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpcacheService } from './httpcache.service';

@Injectable({
  providedIn: 'root'
})
export class CachInterceptorService implements HttpInterceptor {

  constructor(private cacheService:HttpcacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //if the reuest is not GET the move to the next interceptor and remove all the cached data
    if(req.method==='GET'){
      console.log(`unCaching the data of url ${req.url}`);
      this.cacheService.invalidateCashe();
      return next.handle(req);
    }

    //see if there is a response cached for this request(url)

    const cachedResponse=this.cacheService.get(req.url);

    // if the cachedResposne is not null then we have the data fro the cache
    if(cachedResponse){

      console.log(`Returning data from the cached response for ${req.url} `);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    return next.handle(req)
            .pipe(
              tap(event=>{
                if(event instanceof HttpResponse){
                  console.log(`Adding item to the cache for the url ${req.url}`);
                  this.cacheService.put(req.url,event)
                }
              })
            )
  }



}
