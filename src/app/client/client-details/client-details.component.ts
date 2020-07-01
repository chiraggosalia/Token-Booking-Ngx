import { Component, OnInit } from '@angular/core';
import {BookTokenService} from '../../services/book-token.service';
import {AppConstant} from '../../app-constant';
import {ClientAndSessionDetails} from "../../models/ClientAndSessionDetails";
import * as moment from 'moment';
import {UserSessionSummary} from "../../models/UserSessionSummary";
import {NbDateService} from "@nebular/theme";

@Component({
  selector: 'ngx-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  flipped:boolean = false;
  primary:string = "primary";
  allClientSessionDetails: ClientAndSessionDetails[] = [];
  filterValue:UserSessionSummary = new UserSessionSummary();
  minDate:Date;
  maxDate:Date;

  constructor(private bookTokenService: BookTokenService,protected dateService: NbDateService<Date>) {

    this.minDate = this.dateService.addDay(this.dateService.today(), 0);
    this.maxDate = this.dateService.addDay(this.dateService.today(), 6);
  }

  ngOnInit(): void {
    this.bookTokenService.getAllSessionsOfAllClients(AppConstant.userId).subscribe(sessionResponse => {
      this.allClientSessionDetails = sessionResponse;
      console.log(this.allClientSessionDetails);
      this.allClientSessionDetails.forEach( allSession => {
        // allSession.filerDate = moment(new Date()).format('DD-MM-YYYY');
        allSession.filerDate = moment(this.dateService.today()).format('DD-MM-YYYY');
        this.filterValue.date = allSession.filerDate;
        allSession.selectedDate = this.dateService.today();

      });
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

  setFilerDate(index) {
    this.allClientSessionDetails[index].filerDate = moment(this.allClientSessionDetails[index].selectedDate).format('DD-MM-YYYY');
    this.filterValue = new UserSessionSummary();
     this.filterValue.date = this.allClientSessionDetails[index].filerDate;
     console.log("filter values"+this.filterValue.date);
  }
}
