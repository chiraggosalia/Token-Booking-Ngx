import {Component, OnInit} from '@angular/core';
import {AuthuserService} from "../authuser.service";
import {Router} from "@angular/router";
import { Auth } from 'aws-amplify';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js'
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {OtpDialogPromptComponent} from "../dialog/otp-dialog-prompt.component";

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
  currentUserName: string = null;
  countryCode:string = "+91";

  constructor(private authService:AuthuserService,private router: Router,private dialogService:NbDialogService,private toastrService: NbToastrService) { }

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

  onSignUp() {
    let verificationCode;
    Auth.signUp({
      username: this.countryCode + this.user.phoneNumber,
      password: this.user.password,
      attributes:
        {
          name: this.user.fullName,
        }
    }).then((result: ISignUpResult) => {
      console.log("signup result : "+result);
      this.currentUserName = result.user.getUsername();
      if (!result.userConfirmed) {
        this.dialogService.open(OtpDialogPromptComponent)
          .onClose.subscribe(code => {
          if (code) {
            verificationCode = code
            Auth.confirmSignUp(this.currentUserName, verificationCode).then(result => {
              this.showMessages.success = true;
              this.showMessages.error = false;
              this.messages = [];
              this.messages.push("Redirecting to login page...Please wait..");
              setTimeout(() => this.router.navigate(['/auth/login']), 2000);
              this.expanded = false;
            }).catch(err => {
              this.showMessages.error = true;
              this.showMessages.success = false;
              this.errors = [];
              this.errors.push(err.message);
              this.loading = false;
            })
          } else {
            this.showToast('Error', 'warning', 'Unverified user can not login');
          }
        });
      }
      else {
        this.showMessages.success = true;
        this.showMessages.error = false;
        this.messages = [];
        this.messages.push("Redirecting to login page...Please wait..");
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        this.expanded = false;
      }
    }).catch(err => {
      this.showMessages.error = true;
      this.showMessages.success = false;
      this.errors = [];
      this.errors.push(err.message);
      this.loading = false;
    })
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
