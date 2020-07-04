import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxLoginComponent } from './ngx-login/ngx-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import {AuthuserService} from "./authuser.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
  ],
  declarations: [
  NgxLoginComponent,
  UserRegisterComponent],
  providers: [AuthuserService],
})
export class NgxAuthModule {
}
