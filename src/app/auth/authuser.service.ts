import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstant} from "../app-constant";

@Injectable()
export class AuthuserService {

  serverURL= AppConstant.serverURL;
  headers = new HttpHeaders();

  constructor(private _http: HttpClient) {
  }

  authenticate(body) {
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');
    return this._http.post(this.serverURL + '/authenticate', body, {headers: this.headers});
  }
}
