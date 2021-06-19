import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { allBooks } from 'app/data';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private data:DataService
              ) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.data.getBookById(bookID)
        .subscribe(
          book=>this.selectedBook=book,
          error=>console.log("There is an Error"+error),
          ()=>console.log("Request Completed!")
        )
  }

  setMostPopular(): void {
      this.data.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {

     this.data.updateBook(this.selectedBook)
                .subscribe(
                  (data)=>console.log(`The book with id ${this.selectedBook.bookID} was updated`),
                  (error)=>console.log("there is an Error "+error)
                )
  }
}
