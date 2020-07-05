import { Component, OnInit } from '@angular/core';
import {ManageBookingService} from "../services/manage-booking.service";
import {BookingSummary} from "../models/BookingSummary";

@Component({
  selector: 'ngx-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookingSummaryList: BookingSummary[] = [];
  dataAvailable: boolean = false;
  bookedTokenFilter:any;
  cancelledTokenFilter:any;
  completedTokenFilter:any;

  constructor(private manageBookingService:ManageBookingService) { }

  ngOnInit(): void {
    this.dataAvailable = false;
    this.bookingSummaryList = [];
    this.manageBookingService.getBookingsByUserId().subscribe( response => {
      this.bookingSummaryList.push(...response);
      this.bookedTokenFilter = {status:'BOOKED'};
      this.cancelledTokenFilter = {status:'CANCELLED'};
      this.completedTokenFilter = {status:'COMPLETED'};
      this.dataAvailable = true;
    })
  }

  updateList(response: BookingSummary) {
    for (let i = 0; i < this.bookingSummaryList.length; i++) {
      if (this.bookingSummaryList[i].bookingId == response.bookingId) {
        this.bookingSummaryList[i] = response;
        break;
      }
    }
    let temp = [...this.bookingSummaryList];
    this.bookingSummaryList = temp;
  }

}

