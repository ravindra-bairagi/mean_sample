import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.initializeBooks();
  }
  initializeBooks() {
    var promise = new Promise((resolve,reject) => {
      this.http.get('/book/').subscribe(data => {
        this.books = data;
        console.log(this.books);
        resolve(data);
      });
    });
    return promise;
  }
}
