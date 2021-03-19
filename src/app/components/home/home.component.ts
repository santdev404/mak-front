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
  public name: any;
  public p:number = 1;

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


  deleteBook(id){
    this._bookService.delete(id).subscribe(

      response => {

        this.getBooks();

      },
      error => {

        console.log(error);

      }

    );
  }

  Search(){
    if(this.name == ""){

      this.ngOnInit();

    }else{

      this.ngOnInit();


    }

    console.log('entro');
  }

}
