import {Component, OnInit} from '@angular/core';
import {AuthuserService} from "../authuser.service";
import {Router} from "@angular/router";

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
  expanded:boolean = true;
  loading:boolean = false;

  constructor(private authService:AuthuserService,private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    this.authService.register(this.user).subscribe( response => {
      if(response.status == 'SUCCESS') {
        this.showMessages.success = true;
        this.showMessages.error = false;
        this.messages = [];
        this.messages.push(response.message);
        this.messages.push("Redirecting to login page...Please wait..");
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        this.expanded = false;
      } else if(response.status == 'FAILURE') {
        this.showMessages.error=true;
        this.showMessages.success=false;
        this.errors = [];
        this.errors.push(response.errorMessage);
        this.expanded = false;
      }
      this.loading = false;
    }, error => {
      this.showMessages.error = true;
      this.showMessages.success = false;
      this.errors = [];
      this.errors.push(error.message);
      this.loading = false;
    });
  }


}
