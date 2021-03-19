import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

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

  constructor(
    private _bookService: BookService
  ) { 
    this.page_title = 'Crear nuevo libro';
    this.book = new Book(1,1,1,'','','','','','','');
  }


  ngOnInit(): void {
    console.log('Book new');
    console.log(this._bookService.test());
  }

  onSubmit(form){
    this._bookService.create(this.book).subscribe(
      response => {
        console.log(response);
        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    );
    
    
  }


}


