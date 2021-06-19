import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Book } from 'app/models/book';
import { BookError } from 'app/models/bookErrorTracker';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BookresolverService implements Resolve<Book[] |BookError > {


  constructor(private data:DataService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<Book[] |BookError>{
    return this.data.getAllBooks()
               .pipe(
                 catchError(err=>of(err))
               );
  }
}
