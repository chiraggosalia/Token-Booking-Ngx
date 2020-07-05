import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {NbDateService, NbDialogService} from "@nebular/theme";
import {Sessionfilter} from "../models/sessionfilter";
import {AdminService} from "../services/admin.service";
import {AdminSessionSummary} from "../models/AdminSessionSummary";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-client-admin-details',
  templateUrl: './client-admin-details.component.html',
  styleUrls: ['./client-admin-details.component.scss']
})
export class ClientAdminDetailsComponent implements OnInit {

  flipped:boolean = false;
  success:string = "success";
  adminSessionSummaryList: AdminSessionSummary[] = [];
  filterValue:Sessionfilter = new Sessionfilter();
  minDate:Date;
  maxDate:Date;
  dataAvailable:boolean = false;
  clientName:string;

  loading:boolean = false;
  selectedSessionID:string;
  selectedAction:string;

  constructor(private adminService:AdminService,protected dateService: NbDateService<Date>, private dialogService: NbDialogService,private router: Router) {
    this.minDate = this.dateService.addDay(this.dateService.today(), 0);
    this.maxDate = this.dateService.addDay(this.dateService.today(), 6);
  }

  ngOnInit(): void {
    this.dataAvailable = false;
    this.adminService.getSessions().subscribe( response => {
      this.adminSessionSummaryList = response.message;
      this.filterValue.filterDate = moment(this.dateService.today()).format('DD-MM-YYYY');
      this.filterValue.selectedDate = this.dateService.today();
      this.filterValue.selectedDay = this.dateToFromNowDaily(this.filterValue.selectedDate);
      this.dataAvailable = true;
      if (this.adminSessionSummaryList != null && this.adminSessionSummaryList.length > 0) {
        this.clientName = this.adminSessionSummaryList[0].clientName;
      }
      console.log(response);
    });
  }

  openConfirmation(sessionId, action) {
    this.selectedSessionID = sessionId;
    this.selectedAction = action;
    this.flipToggle();
  }

  OK() {
    switch (this.selectedAction) {
      case 'START':
        this.startSession();
        break;
      case 'CANCEL':
        this.cancelSession();
        break;
      case 'COMPLETE':
        this.completeSession();
        break;
      default:
        break;
    }
  }

  startSession() {
    this.adminService.startSession(this.selectedSessionID).subscribe(response => {
      if(response.status=='SUCCESS') {
        console.log();
        //this.router.navigate(['/base/admin/activesession']);
      }
      console.log();
    });

  }

  cancelSession() {
    this.flipToggle();
  }
  completeSession() {
    this.flipToggle();
  }

  flipToggle() {
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
      sameElse: function () {
        return "[" + fromNow + "]";
      }
    });
  }



}
