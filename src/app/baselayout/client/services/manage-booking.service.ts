import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../../../app-constant";
import {Observable} from "rxjs";
import {BookingSummary} from "../models/BookingSummary";
import {ResponseStatus} from "../../client-admin/models/ResponseStatus";

@Injectable()
export class ManageBookingService {
  serverURL = AppConstant.serverURL;
  baseURL = this.serverURL + "/enduserapi"

  constructor(private _http : HttpClient) { }

  getBookingsByUserId() : Observable<ResponseStatus<BookingSummary[]>> {
      const url = this.baseURL + '/users/bookings';
      return this._http.get<ResponseStatus<BookingSummary[]>>(url);
  }

  cancelBooking(bookingId) : Observable<ResponseStatus<BookingSummary>> {
    const url = this.baseURL + '/cancelBooking/' + bookingId;
    return this._http.put<ResponseStatus<BookingSummary>>(url, null);
  }

  submitBooking(bookingId) : Observable<ResponseStatus<BookingSummary>> {
    const url = this.baseURL + '/submitBooking/' + bookingId;
    return this._http.put<ResponseStatus<BookingSummary>>(url, null);
  }

}
