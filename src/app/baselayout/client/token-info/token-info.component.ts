import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookingSummary} from "../models/BookingSummary";
import {ManageBookingService} from "../services/manage-booking.service";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

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

  constructor(private manageBookingService:ManageBookingService, private toastrService: NbToastrService) {
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
      this.manageBookingService.submitBooking(this.bookingSummary.bookingId).subscribe(response => {
        this.loading = false;
        if (response.status === 'SUCCESS') {
          this.actionResponse.emit(response.message);
        } else {
          this.showToast('Warning','warning', response.errorMessage);
        }
        this.toggleView();
      }, error => {
        this.loading = false;
        this.showToast('Error','danger', error);
      });
    } else if (this.actionSelected == 'CANCEL') {
      this.manageBookingService.cancelBooking(this.bookingSummary.bookingId).subscribe(response => {
        this.loading = false;
        if (response.status === 'SUCCESS') {
          this.actionResponse.emit(response.message);
        } else {
          this.showToast('Warning', 'warning', response.errorMessage);
        }
        this.toggleView();
      }, error => {
        this.showToast('Error', 'danger', error);
        this.loading = false;
      });
    }
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
