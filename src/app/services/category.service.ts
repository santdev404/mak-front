import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book';
import {Category} from '../models/category';
import {global} from './global';


@Injectable()
export class CategoryService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return "Category service!!!";
    }

    getCategories(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.get(this.url+'category', {headers: headers});

	}

	getCategory(id): Observable<any>{

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.get(this.url+'category/'+id, {headers: headers});

	}


}