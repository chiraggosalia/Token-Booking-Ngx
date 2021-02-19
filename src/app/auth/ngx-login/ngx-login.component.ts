import { Component, OnInit} from '@angular/core';
import {AuthuserService} from '../authuser.service';
import {Router} from "@angular/router";
import { Auth } from 'aws-amplify';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

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
  loading: boolean = false;
  countryCode: string = '+91';

  constructor(private authuserService: AuthuserService, private router: Router, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;

      let userData = {
        username: this.countryCode + this.user.username,
        password: this.user.password,
      }
      Auth.signIn(userData.username, userData.password).then(async (result: any) => {
        this.loading = false;

        this.showMessages.success = true;
        this.showMessages.error = false;

        this.messages = [];
        this.getCurrentUser();

      }).catch(err => {
        if (err.code == "UserNotConfirmedException") {
            this.showToast('Error','warning', err.message);
        }
        else {
          this.showToast('Error','danger', err.message);
        }
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

   getCurrentUser() {
    let userName: string, jwt: string, role: string,loginId:string;

    Auth.currentSession().then(res => {
      let accessToken = res.getAccessToken();
      jwt = accessToken.getJwtToken();
      loginId = accessToken["payload"]["username"];
      role = this.getUserRole(accessToken["payload"]["cognito:groups"]);

      Auth.currentUserInfo().then(res => {
        userName = res.attributes["name"];
        this.authuserService.saveUserDetails({'fullName': userName, 'loginId': loginId}).subscribe( res => {
        });
        localStorage.setItem("currentUser", JSON.stringify({'userName': userName, 'jwt': jwt, 'role': role}));
        this.messages.push("Login Successful!!");
        this.messages.push("Redirecting to home page...Please wait..");
        if (role.toLocaleUpperCase() ==  "USER") {
          setTimeout(() => this.router.navigate(['/base/client/home']), 2000);
        } else if (role.toLocaleUpperCase() == "ADMIN") {
          setTimeout(() => this.router.navigate(['/base/admin/home']), 2000);
        }
      });
    });


  }

  getUserRole(userGroups: string[]): string {
    if (userGroups == undefined || userGroups.length == 0) {
      return "USER";
    }
    return userGroups[0];
  }
}
