import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstant} from '../../../app-constant';
import {ClientAndSessionDetails} from "../models/ClientAndSessionDetails";
import {Observable} from "rxjs";
import {ClientNameAndId} from "../models/ClientNameAndId";
import {BookingDetails} from "../models/BookingDetails";
import {ResponseStatus} from "../../client-admin/models/ResponseStatus";

@Injectable()
export class BookTokenService {
  serverURL = AppConstant.serverURL;
  baseURL = this.serverURL + "/enduserapi"
  constructor(private _http : HttpClient) { }

  getAllActiveClientNames(): Observable<ClientNameAndId[]> {
    return this._http.get<ClientNameAndId[]>(this.baseURL + '/clientname');
  }

  getAllSessionsByClientId(clientId): Observable<ClientAndSessionDetails> {
    const url = this.baseURL + '/clients/' + clientId + '/sessions';
    return this._http.get<ClientAndSessionDetails>(url);
  }

  getNextAvailableTokenBySessionId(sessionId) {
    const url = this.baseURL + '/sessions/' + sessionId + '/nextAvailableToken';
    return this._http.get(url);
  }

  confirmBooking(body): Observable<ResponseStatus<BookingDetails>> {
    return this._http.post<ResponseStatus<BookingDetails>>(this.baseURL + '/booktoken', body);
  }

}
