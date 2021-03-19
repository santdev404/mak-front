import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Category } from '../../models/category';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute, Params} from '@angular/router';


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

  constructor(
    private _bookService: BookService,
    private _categoryService: CategoryService,
    private _router: Router
  ) { 
    this.page_title = 'Crear nuevo libro';
    this.book = new Book(1,1,1,'','','','','','','');
    this.is_edit = false;
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


}


