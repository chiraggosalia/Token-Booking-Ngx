import {Component, Input, OnInit} from '@angular/core';
import {BookTokenService} from '../services/book-token.service';
import {AppConstant} from '../../../app-constant';
import {ClientAndSessionDetails} from "../models/ClientAndSessionDetails";
import * as moment from 'moment';
import {UserSessionSummary} from "../models/UserSessionSummary";
import {NbDateService} from "@nebular/theme";
import {MdmService} from "../services/mdm.service";
import {Sessionfilter} from "../models/sessionfilter";

@Component({
  selector: 'ngx-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  @Input()
  clientId:number;

  flipped:boolean = false;
  primary:string = "primary";
  clientSessionDetails: ClientAndSessionDetails = new ClientAndSessionDetails();
  filterValue:Sessionfilter = new Sessionfilter();
  minDate:Date;
  maxDate:Date;
  dataAvailable:boolean = false;

  constructor(private bookTokenService: BookTokenService,protected dateService: NbDateService<Date>) {
    this.minDate = this.dateService.addDay(this.dateService.today(), 0);
    this.maxDate = this.dateService.addDay(this.dateService.today(), 6);
  }

  ngOnInit(): void {
    this.bookTokenService.getAllSessionsByClientId(this.clientId, AppConstant.userId).subscribe(sessionResponse => {
      this.clientSessionDetails = sessionResponse;
      console.log(this.clientSessionDetails);
      this.filterValue.filterDate = moment(this.dateService.today()).format('DD-MM-YYYY');
      this.filterValue.selectedDate = this.dateService.today();
      this.filterValue.selectedDay = this.dateToFromNowDaily(this.filterValue.selectedDate);
      this.dataAvailable = true;
      //moment(this.allClientSessionDetails., 'DD-MM-YYYY').format('dddd');
      /*// this.clientSessionDetails.sessions.sort((s1, s2) => this.compareSessionDate(s1, s2));
      if (this.allClientSessionDetails.sessions.length > 0) {
        this.currentSession = this._util.createSession(this.clientSessionDetails.sessions[0], this.clientSessionDetails);
        this.maxSession = this.clientSessionDetails.sessions.length-1;
      }*/
    });
  }

  onBookToken() {
    this.flipped = !this.flipped;
  }

  setFilerDate() {
    let newFilterValue = new Sessionfilter();

    newFilterValue.filterDate = moment(this.filterValue.selectedDate).format('DD-MM-YYYY');
    newFilterValue.selectedDay = this.dateToFromNowDaily(this.filterValue.selectedDate);
    newFilterValue.selectedDate = this.filterValue.selectedDate;
    this.filterValue = newFilterValue;
  }

  dateToFromNowDaily(myDate) {
    var fromNow = moment(myDate).fromNow();

    return moment(myDate).calendar(null, {
      lastWeek: '[Last] dddd',
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      // when the date is further away, use from-now functionality
      sameElse: function () {
        return "[" + fromNow + "]";
      }
    });
  }

}
