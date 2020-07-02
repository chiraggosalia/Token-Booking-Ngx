import {Component, Input, OnInit} from '@angular/core';
import {BookTokenService} from '../services/book-token.service';
import {AppConstant} from '../../../app-constant';
import {ClientAndSessionDetails} from "../models/ClientAndSessionDetails";
import * as moment from 'moment';
import {UserSessionSummary} from "../models/UserSessionSummary";
import {NbDateService} from "@nebular/theme";
import {MdmService} from "../services/mdm.service";

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
  filterValue:UserSessionSummary = new UserSessionSummary();
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
      this.clientSessionDetails.filerDate = moment(this.dateService.today()).format('DD-MM-YYYY');
      this.filterValue.date = this.clientSessionDetails.filerDate;
      this.clientSessionDetails.selectedDate = this.dateService.today();
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
    this.clientSessionDetails.filerDate = moment(this.clientSessionDetails.selectedDate).format('DD-MM-YYYY');
    this.filterValue = new UserSessionSummary();
    this.filterValue.date = this.clientSessionDetails.filerDate;
    console.log("filter values" + this.filterValue.date);
  }
}
