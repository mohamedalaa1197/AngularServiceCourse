import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, ɵHttpInterceptingHandler} from '@angular/common/http'
import { LoggerService } from './logger.service';
import { BookError } from 'app/models/bookErrorTracker';
import {catchError} from 'rxjs/operators'
import {throwError}from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class DataService {

  mostPopularBook=allBooks[1];

  constructor(private logger:LoggerService,private http:HttpClient) { }

  getAllReaders():Observable<Reader[] | BookError>{
    return this.http.get<Reader[]>('api/Reader')
               .pipe(catchError(this.Errorhandler))

  }

  private Errorhandler(error:HttpErrorResponse):Observable<BookError>{

    let dataError=new BookError();
    dataError.erorrNumber=100;
    dataError.errorMessage=error.message;
    dataError.friendlyMessage='An error has occured in retriveing data';

    return throwError(dataError);
  }

  setMostPopularBook(book:Book){
     return this.mostPopularBook=book;
  }

  getreaderById(id:number):Reader{
    return allReaders.find(reader=>reader.readerID===id);
  }


  getAllBooks():Book[]{
    return allBooks;
  }


  getBookById(id:number):Book{
    return allBooks.find(book=>book.bookID===id);
  }
}
