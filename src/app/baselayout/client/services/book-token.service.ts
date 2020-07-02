import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstant} from '../../../app-constant';
import {ClientAndSessionDetails} from "../models/ClientAndSessionDetails";
import {Observable} from "rxjs";
import {ClientIdNameAddress} from "../models/ClientIdNameAddress";
import {ClientNameAndId} from "../models/ClientNameAndId";

@Injectable()
export class BookTokenService {
  serverURL = AppConstant.serverURL;
  baseURL = this.serverURL + "/enduserapi"
  constructor(private _http : HttpClient) { }

  getAllActiveClientNames(): Observable<ClientNameAndId[]> {
    return this._http.get<ClientNameAndId[]>(this.baseURL + '/clientname');
  }

  getAllSessionsByClientId(clientId,userId): Observable<ClientAndSessionDetails> {
    const url = this.baseURL + '/clients/' + clientId + '/sessions' + '?userId=' + userId;
    return this._http.get<ClientAndSessionDetails>(url);
  }

  public getAllSessionsOfAllClients(userId): Observable<ClientAndSessionDetails[]> {
    const url = this.baseURL + '/clients/sessions' + '?userId=' + userId;
    return this._http.get<ClientAndSessionDetails[]>(url);
  }

  getNextAvailableTokenBySessionId(sessionId) {
    const url = this.baseURL + '/sessions/' + sessionId + '/nextAvailableToken';
    return this._http.get(url);
  }

  confirmBooking(body) {
    return this._http.post(this.baseURL + '/booktoken', body);
  }

}
