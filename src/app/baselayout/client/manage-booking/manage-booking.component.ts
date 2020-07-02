import { Component, OnInit } from '@angular/core';
import {ManageBookingService} from "../services/manage-booking.service";
import {AppConstant} from "../../../app-constant";
import {BookingSummary} from "../models/BookingSummary";

@Component({
  selector: 'ngx-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookingSummaryList: BookingSummary[] = [];
  dataAvailable: boolean = false;
  constructor(private manageBookingService:ManageBookingService) { }

  ngOnInit(): void {
    this.getBookingsByUserId();
  }

  getBookingsByUserId() {
    this.dataAvailable = false;
    this.bookingSummaryList = [];
    this.manageBookingService.getBookingsByUserId(AppConstant.userId).subscribe( response => {
      console.log(response);
      this.dataAvailable = true;
      this.bookingSummaryList.push(...response);
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
