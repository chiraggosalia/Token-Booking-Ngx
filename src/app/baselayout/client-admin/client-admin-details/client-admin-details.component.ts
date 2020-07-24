import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {
  NbComponentStatus,
  NbDateService,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbToastrService
} from "@nebular/theme";
import {Sessionfilter} from "../models/sessionfilter";
import {AdminService} from "../services/admin.service";
import {Router} from "@angular/router";
import {AdminSummary} from "../models/AdminSummary";

@Component({
  selector: 'ngx-client-admin-details',
  templateUrl: './client-admin-details.component.html',
  styleUrls: ['./client-admin-details.component.scss']
})
export class ClientAdminDetailsComponent implements OnInit {

  flipped:boolean = false;
  success:string = "success";
  danger:string = "danger";
  warning:string = "warning";

  adminSummary: AdminSummary;
  filterValue:Sessionfilter = new Sessionfilter();
  minDate:Date;
  maxDate:Date;
  dataAvailable:boolean = false;
  clientName:string;

  loading:boolean = false;
  selectedSessionID:string;
  selectedAction:string;

  constructor(private adminService:AdminService,protected dateService: NbDateService<Date>, private dialogService: NbDialogService,private router: Router, private toastrService: NbToastrService) {
    this.minDate = this.dateService.addDay(this.dateService.today(), 0);
    this.maxDate = this.dateService.addDay(this.dateService.today(), 6);
  }

  ngOnInit(): void {
    this.dataAvailable = false;
    this.adminService.getSessions().subscribe( response => {
      this.adminSummary = response.message;
      this.filterValue.filterDate = moment(this.dateService.today()).format('DD-MM-YYYY');
      this.filterValue.selectedDate = this.dateService.today();
      this.filterValue.selectedDay = this.dateToFromNowDaily(this.filterValue.selectedDate);
      this.clientName = this.adminSummary.clientName;
      this.dataAvailable = true;

      console.log(response);
    },error => {
      this.showToast('Error','danger', error.message);
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
      case 'FINISH':
        this.finishSession();
        break;
      default:
        break;
    }
  }

  startSession() {
    this.adminService.startSession(this.selectedSessionID).subscribe(response => {
      if(response.status=='SUCCESS') {
        this.router.navigate(['/base/admin/activesession',this.selectedSessionID]);
      } else if(response.status=='FAILURE') {
        this.showToast('Error','danger',response.message);
      }
      this.flipToggle();
    }, error => {
      this.showToast('Error','danger', error.message);
    });

  }

  cancelSession() {
    this.adminService.cancelSession(this.selectedSessionID).subscribe(response => {
      if(response.status=='SUCCESS') {
        this.showToast('Success','success',response.message);
        setTimeout(() => this.ngOnInit(), 2000);
      } else if(response.status=='FAILURE') {
        this.showToast('Error','danger',response.message);
      }
      this.flipToggle();
    },error => {
      this.showToast('Error','danger', error.message);
    });
  }
  finishSession() {
    this.adminService.finishSession(this.selectedSessionID).subscribe(response => {
      if(response.status=='SUCCESS') {
        this.showToast('Success','success',response.message);
        setTimeout(() => this.ngOnInit(), 2000);
      } else if(response.status=='FAILURE') {
        this.showToast('Error','danger',response.message);
      }
      this.flipToggle();
    }, error => {
      this.showToast('Error','danger', error.message);
    });
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

  private showToast(title:string, type: NbComponentStatus, body: string) {
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
