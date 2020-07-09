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
  tokenNumber: number = 2;
  success: string = "success";
  tokenInfo: TokenInfo;
  errors: string[] = [];
  constructor(private adminService:AdminService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("IIIIDDDD"+params['id']);
      this.sessionId = params['id'];
      this.adminService.lastToken(this.sessionId).subscribe(response => {
        if (response.status == 'SUCCESS' && response.message == null) {
          this.adminService.nextToken(this.sessionId).subscribe(response => {
            this.tokenInfo = response.message;
            console.log(response.message);
          });
        }
        this.tokenInfo = response.message;
        console.log(this.tokenInfo);
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
