import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookingSummary} from "../models/BookingSummary";
import {ManageBookingService} from "../services/manage-booking.service";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {getDistanceFromLatLonInKm} from "../services/geo-location.service";
import {GeoLocationErrorCodeEnum} from "../models/GeoLocationErrorCodeEnum";
import {Router} from "@angular/router";
import {PageReload} from "../../PageReload";

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

  constructor(private manageBookingService: ManageBookingService, private toastrService: NbToastrService, private router: Router, private pageReload: PageReload) {
  }

  ngOnInit(): void {
  }

  toggleView() {
    this.flipped = !this.flipped;
  }

  submitToken() {
    this.actionSelected = "SUBMIT";
    this.getLocation();
    this.toggleView();
  }

  cancelToken() {
    this.actionSelected = "CANCEL";
    this.toggleView();
  }

  OK() {
    if (this.actionSelected == 'SUBMIT') {
      if (!this.validateCurrentLocation()) {
        this.toggleView();
        return;
      }
      this.loading = true;
      this.manageBookingService.submitBooking(this.bookingSummary.bookingId).subscribe(response => {
        this.loading = false;
        if (response.status === 'SUCCESS') {
          this.pageReload.redirectTo(this.router.url);
          this.showToast('Info','success', 'Token submitted successfully');
        } else {
          this.showToast('Info','primary', response.errorMessage);
        }
        this.toggleView();
      }, error => {
        this.loading = false;
        this.showToast('Error','danger', error.message);
      });
    } else if (this.actionSelected == 'CANCEL') {
      this.manageBookingService.cancelBooking(this.bookingSummary.bookingId).subscribe(response => {
        this.loading = false;
        if (response.status === 'SUCCESS') {
          this.actionResponse.emit(response.message);
          this.showToast('Info','success', 'Token cancelled successfully');
        } else {
          this.showToast('Warning', 'warning', response.errorMessage);
        }
        this.toggleView();
      }, error => {
        this.showToast('Error', 'danger', error.message);
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

  getLocation() {
    document.getElementById('locationError').innerText = undefined;
    var geoError = function (error) {
      switch (error.code) {
        case error.TIMEOUT:
          document.getElementById('locationError').innerHTML = GeoLocationErrorCodeEnum.TIMEOUT.toString();
          break;
        case error.PERMISSION_DENIED:
          document.getElementById('locationError').innerHTML = GeoLocationErrorCodeEnum.PERMISSION_DENIED.toString();
          break;
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition,geoError);
    } else {
      document.getElementById('locationError').innerHTML = GeoLocationErrorCodeEnum.BROWSER_NOT_SUPPORTED.toString();
    }
  }

  showPosition(position) {
    document.getElementById('startLat').innerHTML = position.coords.latitude;
    document.getElementById('startLon').innerHTML = position.coords.longitude;
  }

  validateCurrentLocation(): boolean {
    try {
      const error = document.getElementById('locationError').innerHTML;

      if (this.hasErrorInReturnCode(error)) {
        return false;
      }

      let currentLat = document.getElementById('startLat').innerText;
      let currentLon = document.getElementById('startLon').innerText;
      // 19.025077, 72.853223
      let distance = getDistanceFromLatLonInKm(19.025077, 72.853223, currentLat, currentLon);
      let distanceInMeter = distance*1000;
      distance = Math.round(distance * 100) / 100;
      distanceInMeter = Math.round(distanceInMeter * 100) / 100;
      if (distanceInMeter < 100) {
        return true;
      } else {
        if (distance > 1) {
          this.showToast('Info', 'warning', 'You are ' + distance + ' kilometers away, please submit after you reach the clinic');
        }
        if (distance <= 1) {
          this.showToast('Info', 'warning', 'You are ' + distanceInMeter + ' meters away, please submit after you reach the clinic');
        }
        return false;
      }

    } catch (e) {
      this.showToast('Error', 'danger', e.message);
      return false;
    }
    return true;
  }

  hasErrorInReturnCode(error) {
    console.log('Location error code >> ' + error);
    if (error === GeoLocationErrorCodeEnum.BROWSER_NOT_SUPPORTED) {
      this.showToast('Error', 'danger', 'Browser is not compatible ');
      return true;
    } else if (error === GeoLocationErrorCodeEnum.PERMISSION_DENIED || error === GeoLocationErrorCodeEnum.TIMEOUT) {
      this.showToast('Error', 'danger', 'We need your current location to verify that your action');
      return true;
    }
    return false;
  }

}
