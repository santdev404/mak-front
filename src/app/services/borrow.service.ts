import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book';
import {global} from './global';


@Injectable()
export class BorrowService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return "Borrow service!!!";
    }


    isBorrow(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.get(this.url+'borrow/'+id, {headers: headers});

	}

    updateAssignedTo(id, user_id): Observable<any>{

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

		return this._http.put(this.url+'borrow/assign/'+id+'/'+user_id, {headers: headers});

	}


    updateUnassignedTo(id): Observable<any>{

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

		return this._http.put(this.url+'borrow/unassign/'+id, {headers: headers});

	}

    getUsers(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.get(this.url+'users', {headers: headers});

	}





}