import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstant} from "../../../app-constant";
import {ResponseStatus} from "../models/ResponseStatus";
import {AdminSessionSummary} from "../models/AdminSessionSummary";

@Injectable()
export class AdminService {
  serverURL = AppConstant.serverURL;

  constructor(private http: HttpClient) {
  }

  getSessions() {
    const url = this.serverURL + '/admin/sessions/';
    return this.http.get<ResponseStatus<AdminSessionSummary[]>>(url);
  }

  startSession(sessionId) {
    const url = this.serverURL + '/admin/startsession/' + sessionId;
    return this.http.get<ResponseStatus<any>>(url);
  }

  nextToken(sessionId) {
    const url = this.serverURL + '/admin/nexttoken/' + sessionId;
    return this.http.get<ResponseStatus<any>>(url);
  }

  lastToken(sessionId) {
    const url = this.serverURL + '/admin/lasttoken/' + sessionId;
    return this.http.get<ResponseStatus<any>>(url);
  }

  getActiveSession(clientId) {
    const url = this.serverURL + '/admin/activesession/' + clientId;
    return this.http.get<ResponseStatus<any>>(url);
  }

  completeSession(sessionId) {
    const url = this.serverURL + '/admin/completesession/' + sessionId;
    return this.http.get<ResponseStatus<any>>(url);
  }
}
