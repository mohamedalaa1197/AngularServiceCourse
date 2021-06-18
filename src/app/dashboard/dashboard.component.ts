import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/core/data.service';
import { LoggerService } from 'app/core/logger.service';
import { allBooks, allReaders } from 'app/data';
import { Book } from "app/models/book";
import { BookError } from 'app/models/bookErrorTracker';
import { Reader } from "app/models/reader";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[] ;
  allReaders: Reader[] ;
  mostPopularBook: Book ;

  constructor(private logger:LoggerService,private data:DataService) { }

  ngOnInit() {
    this.allBooks=this.data.getAllBooks();
   this.data.getAllReaders()
       .subscribe(
         (data :Reader[] |BookError)=> this.allReaders=<Reader[]>data,
         (error:BookError)=>console.log(error.friendlyMessage),
         ()=>this.logger.log("The function has done!")
       );
    this.mostPopularBook=this.data.mostPopularBook;
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
