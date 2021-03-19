import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-book-edit',
  templateUrl: '../book-new/book-new.component.html',
  providers: [BookService]
})
export class BookEditComponent implements OnInit {
  public page_title: string;
  public book: Book;
  public status;
	public is_edit: boolean;


  constructor(
    private _bookService: BookService,
    private _route: ActivatedRoute,
		private _router: Router,
  ) { 
    this.page_title = 'Editar libro';
    this.is_edit	  = true;
  }

  ngOnInit(): void {

    //this.getCategories();
    this.book = new Book(1,1,1,'','','','','','','');
		this.getBook();

  }

  onSubmit(form){
    
		this._bookService.update(this.book, this.book.id).subscribe(

			response => {
				if(response.status == 'success'){
					this.status = 'success';
					//this.book 	= response.book;

					this._router.navigate(['/inicio']);
				}else{
					this.status = 'error';
				}
			},
			error => {
				this.status = 'error';
				
			}

		);
  }


	getBook(){
    //Sacar el id del book de la url
    this._route.params.subscribe(params => {

      let id = +params['id'];


      //Peticion ajax para sacar los datos del post
      this._bookService.getBook(id).subscribe(

        response => {

          if(response.status == 'success'){

            this.book = response.book;

          }else{

            this._router.navigate(['/inicio']);

          }

        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }

      );
    });

}

  

}
