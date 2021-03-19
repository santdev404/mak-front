import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

//Generar categoryService para las categorias

@Component({
  selector: 'book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css'],
  providers: [BookService]
})
export class BookNewComponent implements OnInit {
  public page_title: string;
  public book: Book;
  public is_edit: boolean;

  constructor(
    private _bookService: BookService,
    private _router: Router
  ) { 
    this.page_title = 'Crear nuevo libro';
    this.book = new Book(1,1,1,'','','','','','','');
    this.is_edit = false;
  }


  ngOnInit(): void {
    console.log('Book new');
    console.log(this._bookService.test());
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


}


