import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstant} from "../../../app-constant";
import {ResponseStatus} from "../models/ResponseStatus";
import {AdminSummary} from "../models/AdminSummary";
import {TokenInfo} from "../models/TokenInfo";

@Injectable()
export class AdminService {
  serverURL = AppConstant.serverURL;

  constructor(private http: HttpClient) {
  }

  getSessions() {
    const url = this.serverURL + '/admin/sessions/';
    return this.http.get<ResponseStatus<AdminSummary>>(url);
  }

  startSession(sessionId) {
    const url = this.serverURL + '/admin/startsession/' + sessionId;
    return this.http.get<ResponseStatus<string>>(url);
  }

  nextToken(sessionId) {
    const url = this.serverURL + '/admin/nexttoken/' + sessionId;
    return this.http.get<ResponseStatus<TokenInfo>>(url);
  }

  lastToken(sessionId) {
    const url = this.serverURL + '/admin/lasttoken/' + sessionId;
    return this.http.get<ResponseStatus<TokenInfo>>(url);
  }

  getActiveSession() {
    const url = this.serverURL + '/admin/activesession';
    return this.http.get<ResponseStatus<AdminSummary>>(url);
  }

  finishSession(sessionId) {
    const url = this.serverURL + '/admin/finishsession/' + sessionId;
    return this.http.get<ResponseStatus<string>>(url);
  }

  cancelSession(sessionId) {
    const url = this.serverURL + '/admin/cancelsession/' + sessionId;
    return this.http.get<ResponseStatus<string>>(url);
  }
}
