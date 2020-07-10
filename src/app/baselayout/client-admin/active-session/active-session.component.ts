import { Component, OnInit } from '@angular/core';
import {AdminService} from "../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {TokenInfo} from "../models/TokenInfo";

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

  constructor(private adminService:AdminService, private route:ActivatedRoute) { }

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
      });
    });
  }

  nextToken() {
    this.adminService.nextToken(this.sessionId).subscribe(response => {
      if(response.status == 'SUCCESS') {
        this.tokenInfo = response.message;
        console.log(this.tokenInfo);
      }
    });
  }

}
