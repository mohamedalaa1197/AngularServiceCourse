import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private logger:LoggerService,
                private data:DataService,
                private router:ActivatedRoute) { }

  ngOnInit() {

    let readerBooksData=this.router.snapshot.data["bookResolved"];

    if(readerBooksData instanceof BookError){
      console.log("There is an Error!");
    }else{
      this.allBooks=readerBooksData
    }

   this.data.getAllReaders()
       .subscribe(
         (data :Reader[] |BookError)=> this.allReaders=<Reader[]>data,
         (error:BookError)=>console.log(error.friendlyMessage),
         ()=>this.logger.log("The function has done!")
       );
    this.mostPopularBook=this.data.mostPopularBook;
  }

  deleteBook(bookID: number): void {
   this.data.deleteBook(bookID)
       .subscribe(
          (bookData:void)=>{
            let index:number=this.allBooks.findIndex(book=>book.bookID===bookID);
            this.allBooks.splice(index,0);
          },
          (error)=>console.log("There is an Error"+error)
       )

  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
