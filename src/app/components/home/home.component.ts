import { Component, OnInit } from '@angular/core';
//import { threadId } from 'node:worker_threads';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { global } from '../../services/global';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BookService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url;
  public books: Array<Book>;

  constructor(
    private _bookService: BookService
  ) {
    this.page_title = 'Home page';
    this.url = global.url;
   }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
  	this._bookService.getBooks().subscribe(

  		response => {

  			if(response.status == 'success'){

  				this.books = response.post;
  				console.log(this.books);

  			}

  		},
  		error => {
  			console.log(error);
  		}


  	);
  }

}
