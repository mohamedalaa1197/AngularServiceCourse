import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/core/data.service';
import { Book } from "app/models/book";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit {

  constructor(private data:DataService) { }

  ngOnInit() { }

  saveBook(formValues: any): void {
    let newBook: Book = <Book>formValues;
    newBook.bookID = 0;
    console.log(newBook);

    this.data.addBook(newBook)
        .subscribe(
          (BookData)=>console.log(BookData),
          (error)=>console.log("There is an Erorr "+error)
        )
  }

}
