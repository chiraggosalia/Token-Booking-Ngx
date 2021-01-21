import { Component, OnInit } from '@angular/core';
import {ManageBookingService} from "../services/manage-booking.service";
import {BookingSummary} from "../models/BookingSummary";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookingSummaryList: BookingSummary[] = [];
  dataAvailable: boolean = false;
  submittedTokenFilter:any;
  bookedTokenFilter:any;
  cancelledTokenFilter:any;
  completedTokenFilter:any;
  hasSubmittedToken:boolean=false;

  constructor(private manageBookingService:ManageBookingService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.dataAvailable = false;
    this.bookingSummaryList = [];
    this.manageBookingService.getBookingsByUserId().subscribe(response => {
      if (response.status === 'SUCCESS') {
        this.bookingSummaryList.push(...response.message);
        this.submittedTokenFilter = {status: ['SUBMITTED']};
        this.bookedTokenFilter = {status: ['BOOKED']};
        this.cancelledTokenFilter = {status: ['CANCELLED', 'CANCELLED_BY_ADMIN', 'EXPIRED']};
        this.completedTokenFilter = {status: ['COMPLETED']};
        this.dataAvailable = true;
        this.bookingSummaryList.forEach(b => {
          if (b.status == 'SUBMITTED') {
            this.hasSubmittedToken = true;
            return;
          }
        });
      } else {
        this.showToast('Warning', 'warning', response.errorMessage);
      }
    }, error => {
      this.showToast('Error', 'danger', error.message);
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

  showToast(title:string, type: NbComponentStatus, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }

}

