import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, ɵHttpInterceptingHandler} from '@angular/common/http'
import { LoggerService } from './logger.service';
import { BookError } from 'app/models/bookErrorTracker';
import {catchError,map,tap} from 'rxjs/operators'
import {throwError}from 'rxjs'
import { oldBook } from 'app/models/oldBook';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  mostPopularBook=allBooks[1];

  constructor(private logger:LoggerService,private http:HttpClient) { }

  getAllReaders():Observable<Reader[] | BookError>{
    return this.http.get<Reader[]>('/api/readers')
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

  getreaderById(id:number):Observable<Reader>{
    return this.http.get<Reader>(`/api/Reader/${id}`)
  }


  getAllBooks():Observable<Book[]>{

    return this.http.get<Book[]>("/api/books",{
      headers:new HttpHeaders({
        'Accept':'application/json',
        'Authorizaton':'my-token'
      })
    });
  }

  getOldBook(oldID:number):Observable<oldBook>{

    return this.http.get<Book>(`/api/books/${oldID}`)
               .pipe(
                  map(b => <oldBook>{
                    title:b.title,
                    publicationYear:b.publicationYear
                  }),
                  tap(classicBook=>console.log(classicBook))
               );
  }

  addBook(newBook:Book):Observable<Book>{
    return this.http.post<Book>("/api/books",newBook,{
      headers:{
        "Content-Type":"application/json"
      }
    })
  };

  updateBook(updatedBook:Book):Observable<void>{
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`,updatedBook)
  }

  deleteBook(deletedBookID:number):Observable<void>{
    return this.http.delete<void>(`/api/books/${deletedBookID}`);
  }

  getBookById(id:number):Observable< Book>{
    return this.http.get<Book>(`/api/book/${id}`);
  }
}
