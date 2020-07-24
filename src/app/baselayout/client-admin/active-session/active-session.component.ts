import { Component, OnInit } from '@angular/core';
import {AdminService} from "../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {TokenInfo} from "../models/TokenInfo";
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-active-session',
  templateUrl: './active-session.component.html',
  styleUrls: ['./active-session.component.scss']
})
export class ActiveSessionComponent implements OnInit {

  sessionId: string
  success: string = "success";
  tokenInfo: TokenInfo;
  errors: string[] = [];
  tokenAvailable: boolean = false;

  constructor(private adminService:AdminService, private route:ActivatedRoute, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.adminService.lastToken(this.sessionId).subscribe(response => {
        if (response.status == 'SUCCESS') {
          this.tokenInfo = response.message;
          if (this.tokenInfo == null) {
            this.tokenAvailable = false;
            this.errors.push("No submitted token available.");
          } else {
            this.tokenAvailable = true;
          }
        }
      } , error => {
        this.showToast('Error','danger', error.message);
      });
    });
  }

  nextToken() {
    this.adminService.nextToken(this.sessionId).subscribe(response => {
      if (response.status == 'SUCCESS') {
        this.tokenInfo = response.message;
        if (!this.tokenInfo.hasMoreTokens) {
          this.errors = [];
          this.errors.push("No more submitted tokens available. Please try after some time.");
        }
        console.log(this.tokenInfo);
      }
    },error => {
      this.showToast('Error','danger', error.message);
    });
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
