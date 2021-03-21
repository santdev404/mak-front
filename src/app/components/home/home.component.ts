import { Component, OnInit } from '@angular/core';
//import { threadId } from 'node:worker_threads';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { BorrowService } from '../../services/borrow.service';
import { CategoryService } from '../../services/category.service';

import { global } from '../../services/global';




@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BookService, BorrowService, CategoryService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url;
  public books: Array<Book>;
  public users;
  public bookData;
  public name: any;
  public p:number = 1;
  public selectedValud: string;

  constructor(
    private _bookService: BookService,
    private _borrowService: BorrowService,
    private _categoryService: CategoryService,


  ) {
    this.page_title = 'Home page';
    this.url = global.url;
    
   }

  ngOnInit(): void {
    this.getBooks();
    this.getUsers();

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


  searchBookStatus(id){
    this._borrowService.isBorrow(id).subscribe(

      response => {

        this.bookData = response.result;
        console.log(this.bookData);
      },
      error => {

        console.log(error);

      }

    );
  }


  getUsers(){

   
    this._borrowService.getUsers().subscribe(

			response => {

				if(response.status == 'success'){
          
					this.users =  response.users;

				}
			},
			error => {
				console.log(error);
			}

    );
  }

  savelockBock(id, borrow_user_id){
    
    this._borrowService.updateAssignedTo(id,borrow_user_id).subscribe(

			response => {

				if(response.status == 'success'){
          
					this.getBooks();

				}
			},
			error => {
				console.log(error);
			}

    );

  }


  unlockBook(id){

    this._borrowService.updateUnassignedTo(id).subscribe(

			response => {

				if(response.status == 'success'){
          
					this.getBooks();

				}
			},
			error => {
				console.log(error);
			}

    );
  }
  
  selectChangeHandler(event: any){
    this.selectedValud = event.target.value;
  }


}
