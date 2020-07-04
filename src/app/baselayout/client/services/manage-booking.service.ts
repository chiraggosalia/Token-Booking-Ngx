import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstant} from "../../../app-constant";
import {Observable} from "rxjs";
import {BookingSummary} from "../models/BookingSummary";

@Injectable()
export class ManageBookingService {
  serverURL = AppConstant.serverURL;
  baseURL = this.serverURL + "/enduserapi"

  constructor(private _http : HttpClient) { }

  getBookingsByUserId() : Observable<BookingSummary[]> {
      const url = this.baseURL + '/users/bookings';
      return this._http.get<BookingSummary[]>(url);
  }

  cancelBooking(bookingId) : Observable<BookingSummary> {
    const url = this.baseURL + '/cancelBooking/' + bookingId;
    return this._http.put<BookingSummary>(url, null);
  }

  submitBooking(bookingId) : Observable<BookingSummary> {
    const url = this.baseURL + '/submitBooking/' + bookingId;
    return this._http.put<BookingSummary>(url, null);
  }

}
