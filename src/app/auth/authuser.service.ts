import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstant} from "../app-constant";
import {Observable} from "rxjs";
import {ResponseStatus} from "../baselayout/client/models/ResponseStatus";

@Injectable()
export class AuthuserService {

  serverURL= AppConstant.serverURL;
  baseURL= this.serverURL + '/auth';
  headers = new HttpHeaders();

  constructor(private _http: HttpClient) {
  }

  authenticate(body): any {
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');
    return this._http.post(this.baseURL + '/authenticate', body, {headers: this.headers});
  }

  register(body) : Observable<ResponseStatus> {
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');
    return this._http.post<ResponseStatus>(this.baseURL + '/register', body,{headers: this.headers});
  }

}
