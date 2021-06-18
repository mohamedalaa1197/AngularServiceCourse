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
    this.selectedBook =this.data.getBookById(bookID);
  }

  setMostPopular(): void {
      this.data.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    console.warn('Save changes to book not yet implemented.');
  }
}
