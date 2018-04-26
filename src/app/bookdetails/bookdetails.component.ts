import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  book: any;
  id:number = 0;
  constructor(private route: ActivatedRoute, private http:HttpClient) {
    this.id = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.initializeBookdetails();
  }
  initializeBookdetails() {
    this.http.get('/book/'+this.id).subscribe(data => {
      this.book = data;
    });
  }
}
