import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookingSummary} from "../models/BookingSummary";
import {AppConstant} from "../../../app-constant";
import {ManageBookingService} from "../services/manage-booking.service";

@Component({
  selector: 'ngx-token-info',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.scss']
})
export class TokenInfoComponent implements OnInit {

  @Input()
  bookingSummary: BookingSummary;
  @Output()
  actionResponse: EventEmitter<any> = new EventEmitter();

  flipped = false;
  actionSelected: string;
  loading:boolean = false;

  constructor(private manageBookingService:ManageBookingService) {
  }

  ngOnInit(): void {
  }

  toggleView() {
    this.flipped = !this.flipped;
  }

  submitToken() {
    this.actionSelected = "SUBMIT";
    this.toggleView();
  }

  cancelToken() {
    this.actionSelected = "CANCEL";
    this.toggleView();
  }

  OK() {

    if (this.actionSelected == 'SUBMIT') {
      this.loading = true;
      this.manageBookingService.submitBooking(this.bookingSummary.bookingId).subscribe( response => {
        this.loading = false;
        this.toggleView();
        this.actionResponse.emit(response);
      });
    } else if (this.actionSelected == 'CANCEL') {
      this.manageBookingService.cancelBooking(this.bookingSummary.bookingId).subscribe( response => {
        this.loading = false;
        this.toggleView();
        this.actionResponse.emit(response);
      });
    }
  }

}
