import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {

  messages: string[] = [];
  showMessages: any = [];
  errors: string[] = [];
  loading: boolean = false;
  submitted: boolean = false;
  user: any = {};
  isLoginIdPresent: boolean = false;
  countryCode: string = '+91';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onForgotPassword() {
    this.isLoginIdPresent = true;
    Auth.forgotPassword(this.countryCode + this.user.phoneNumber)
      .then(data => {})
      .catch(err => {
        console.log('ERROR: ' + err);
          this.showMessages.error = true;
          this.showMessages.success = false;
          this.errors.push('Error occured while updating password, please try after some time' + err.message);
        });
  }

  onForgotPasswordSubmit() {
    Auth.forgotPasswordSubmit(this.countryCode + this.user.phoneNumber, this.user.code, this.user.password)
      .then(data => {
        this.showMessages.error = false;
        this.showMessages.success = true;
        this.messages.push('Password updated successfully');
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      })
      .catch(err => {
        console.log('ERROR: ' + err);
        this.showMessages.error = true;
        this.showMessages.success = false;
        this.errors.push('Error occured while updating password, please try after some time' + err.message);
      });
  }
}
