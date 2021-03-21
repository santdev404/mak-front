import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Category } from '../../models/category';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { FormControl } from '@angular/forms';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-book-edit',
  templateUrl: '../book-edit/book-edit.component.html',
  providers: [BookService, CategoryService]
})
export class BookEditComponent implements OnInit {
  public page_title: string;
  public book: Book;
  public categories;
  public status;
	public is_edit: boolean;

  public countries: string[] = ['España', 'Mexico','Colombia'];

  public control = new FormControl();
  public filCountries: Observable <string[]>;


  constructor(
    private _bookService: BookService,
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
		private _router: Router,
  ) { 
    this.page_title = 'Editar libro';
    this.is_edit	  = true;
  }

  ngOnInit(): void {

    this.getCategories();
    this.book = new Book(1,1,1,'','','','','','','');
		this.getBook();

    this.filCountries = this.control.valueChanges.pipe(
      startWith(''),
      map(val => this._filter(val))
    );


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

getCategories(){
  this._categoryService.getCategories().subscribe(

    response => {

      if(response.status == 'success'){

        this.categories = response.categories;


      }


    },
    error => {
      console.log(error);
    }

  );
}

private _filter(val: string): string[] {

  const formatVal = val.toLocaleLowerCase();
  return this.countries.filter(country => country.toLocaleLowerCase().indexOf(formatVal) === 0);

}
  

}
