import {Component, Inject, OnInit} from '@angular/core';
import {AuthuserService} from "../authuser.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'ngx-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  user: any = {};
  submitted: boolean = false;
  messages: string[] = [];
  showMessages: any = [];
  errors: string[] = [];

  constructor(private authService:AuthuserService) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.user);
    this.authService.register(this.user).subscribe( response => {
      console.log(response);
      if(response.status == 'SUCCESS'){
        this.showMessages.success = true;
        this.showMessages.error = false;
        this.messages = [];
        this.messages.push(response.message);
      } else if(response.status == 'FAILURE') {
        this.showMessages.error=true;
        this.showMessages.success=false;
        this.errors = [];
        this.errors.push(response.message);
      }
    });
  }


}
