import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent implements OnInit {
  public page_title: string;

  constructor() { 
    this.page_title = 'Crear nuevo libro';
  }


  ngOnInit(): void {
    console.log('Book new');
  }

}
