import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book';
import {global} from './global';


@Injectable()
export class BookService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return "Book service!!!";
    }

    create(book): Observable<any>{

        let json    = JSON.stringify(book);
        let params  = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'book',params, {headers: headers});


    }

}