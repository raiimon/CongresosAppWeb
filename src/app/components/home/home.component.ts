import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public books = [];
  public book = '';

  ngOnInit() {
    /*this.dataApi.getAllBooks().subscribe(books => {
      console.log('BOOKS', books);
      this.books = books;
    });*/
  }

}
