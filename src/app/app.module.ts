
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';


import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';


import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookNewComponent } from './components/book-new/book-new.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent,
    BookDetailComponent,
    BookEditComponent,
    BookNewComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule

  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
