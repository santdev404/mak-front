import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
//import { threadId } from 'node:worker_threads';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { BorrowService } from '../../services/borrow.service';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { global } from '../../services/global';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


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
      this.http.get<any>('http://maniak.com.devel/api/books').pipe(tap(data => this.opts = data))
  }
}


/***************************** */

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [BookService, BorrowService, CategoryService]
})

export class ListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public page_title: string;
  public url;

  public books = [];

  public filterValues = {};
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['id', 'name', 'publication_date', 'author', 'category', 'borrow', 'buttons'];

  
  public filterSelectObj = [];

  public remoteDummy = new MatTableDataSource();
  public users;
  public bookData;
  public selectedValud: string;

  constructor(
    private _bookService: BookService,
    private _borrowService: BorrowService,
    private _categoryService: CategoryService,
    private service: Service,
    private _router: Router

  ) { 


    this.page_title = 'Home page';
    this.url = global.url;

    this.filterSelectObj = [
      {
        name: 'ID',
        columnProp: 'ID',
        options: []
      }, {
        name: 'Name',
        columnProp: 'NAME',
        options: []
      }, {
        name: 'Publication date',
        columnProp: 'publication_date',
        options: []
      }, {
        name: 'Autor',
        columnProp: 'author',
        options: []
      }, {
        name: 'Status',
        columnProp: 'borrow',
        options: []
      }
    ]


  }

  ngOnInit(): void {

    this.getRemoteData();

    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
    
    this.getUsers();

  }


  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

    // Get remote serve data using HTTP call
    getRemoteData() {

      this._bookService.getBooks().subscribe(

        response => {
  
          this.dataSource.data = response.post;
          this.remoteDummy.data = response.post;   
          this.dataSource.paginator = this.paginator;   
          
          this.filterSelectObj.filter((o) => {
            o.options = this.getFilterObject(this.dataSource.data, o.columnProp);
          });
  
        }
  
  
      );

    }

      // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }


  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  edithBook(id){
    this._router.navigate(['/editar-libro',id]);
  }


  deleteBook(id){


    this._bookService.delete(id).subscribe(

      response => {

        this.getRemoteData();

      },
      error => {

        console.log(error);

      }

    );
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

  selectChangeHandler(event: any){
    this.selectedValud = event.target.value;
  }

  savelockBock(id, borrow_user_id){
    
    this._borrowService.updateAssignedTo(id,borrow_user_id).subscribe(

			response => {

				if(response.status == 'success'){
          
					this.getRemoteData();

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
          
					this.getRemoteData();

				}
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

}
