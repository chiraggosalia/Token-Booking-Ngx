import { Injectable } from '@angular/core';
import {AppConstant} from '../app-constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthuserService {

  serverURL= AppConstant.serverURL;
  headers = new HttpHeaders();


  constructor(private _http : HttpClient) { }

  authenticate(body) {
    this.headers.append('Content-Type','application/json; charset=utf-8');
    this.headers.append('X-Requested-With','XMLHttpRequest');
      return this._http.post(this.serverURL + '/authenticate', body,{headers:this.headers});
  }
}
