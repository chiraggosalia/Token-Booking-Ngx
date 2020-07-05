import { Component, OnInit } from '@angular/core';
import {ClientNameAndId} from "../models/ClientNameAndId";
import {BookTokenService} from "../services/book-token.service";

@Component({
  selector: 'ngx-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  clientInfos: ClientNameAndId[] = [];
  constructor(private bookTokenService: BookTokenService) { }

  ngOnInit(): void {
    this.clientInfos = [];
    this.bookTokenService.getAllActiveClientNames().subscribe(sessionResponse => {
      this.clientInfos.push(...sessionResponse);
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude);
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
