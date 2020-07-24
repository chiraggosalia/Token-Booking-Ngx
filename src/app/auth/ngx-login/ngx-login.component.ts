import { Component, OnInit} from '@angular/core';
import {AuthuserService} from '../authuser.service';
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-login',
  templateUrl: './ngx-login.component.html',
  styleUrls: ['./ngx-login.component.scss'],
})
export class NgxLoginComponent implements OnInit {

  user: any = {};
  submitted: boolean = false;
  messages: string[] = [];
  showMessages: any = [];
  errors: string[] = [];

  constructor(private authuserService: AuthuserService,private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authuserService.authenticate(this.user).subscribe(result => {
        this.showMessages.success = true;
        this.showMessages.error = false;
        this.messages = [];
        localStorage.setItem("currentUser", JSON.stringify({'userName':result.userName,'jwt':result.jwt,'role':result.role}));
        this.messages.push("Login Successful!!");
        this.messages.push("Redirecting to home page...Please wait..");
        if (result.role == "USER") {
          setTimeout(() => this.router.navigate(['/base/client/home']), 2000);
        } else if (result.role == "ADMIN") {
          setTimeout(() => this.router.navigate(['/base/admin/home']), 2000);
        }

      },
      error => {
        this.showMessages.error = true;
        this.showMessages.success = false;
        this.errors = [];
        this.errors.push(error.message);
      });
  }

}
