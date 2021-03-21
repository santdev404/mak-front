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
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css'],
  providers: [BookService, CategoryService]
})
export class BookNewComponent implements OnInit {
  public page_title: string;
  public book: Book;
  public categories;
	public status;
  public is_edit: boolean;




  /***************************** */
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;
  /***************************** */



  constructor(
    private _bookService: BookService,
    private _categoryService: CategoryService,
    private _router: Router,

    private service: Service

  ) { 
    this.page_title = 'Crear nuevo libro';
    this.book = new Book(1,1,1,'','','','','','','');
    this.is_edit = false;

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
    
    this.getCategories();
    
  }

  onSubmit(form){

    this._bookService.create(this.book).subscribe(
      response => {
        this._router.navigate(['/inicio']);
        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    );
    
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


