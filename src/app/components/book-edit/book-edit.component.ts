import { Component, OnInit, Injectable } from '@angular/core';
import { Book } from '../../models/book';
import { Category } from '../../models/category';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { FormControl } from '@angular/forms';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

import { HttpClient } from '@angular/common/http';

/***************************** */
@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }

  opts = [];

  getData() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>('http://maniak.com.devel/api/category').pipe(tap(data => this.opts = data))
  }
}


/***************************** */

@Component({
  selector: 'book-new',
  templateUrl: '../book-new/book-new.component.html',
  providers: [BookService, CategoryService]
})
export class BookEditComponent implements OnInit {
  public page_title: string;
  public book: Book;
  public categories;
	public status;
  public is_edit: boolean;
  public selectedValud: string;




  /***************************** */
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;
  /***************************** */



  constructor(
    private _bookService: BookService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private service: Service

  ) { 
    this.page_title = 'Editar libro';
    this.book = new Book(1,1,1,'','','','','','','');
    this.is_edit = true;

    /****************************** */
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       }) 
    )

    /****************************** */


  }


  ngOnInit(): void {
    
    this.getBook();
    
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
            console.log(this.book);

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


	onSubmit(form){
		this._bookService.update(this.book, this.book.id).subscribe(

			response => {
				if(response.status == 'success'){
          this._router.navigate(['/inicio']);
          form.reset();
				}else{
					this.status = 'error';
				}
			},
			error => {
				this.status = 'error';
				
			}

		);
	}


  selectChangeHandler(option){

    console.log(option.id);
    this.book.category_id = option.id;
  }


  /***************************** */

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
       map(response => response.filter(option => { 
         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   } 

     displayFn(id) {
    // I want to get the full object and display the name
    if (!id) return '';

    return this.service.getData()
    .pipe(
      map(response => response.filter(option => { 

        if(option.id === id){
          return option.id;
        }

      }))
    )
  }

  /***************************** */
}


