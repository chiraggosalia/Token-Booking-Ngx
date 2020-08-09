import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import {
  NbAccordionModule,
  NbAlertModule,
  NbButtonModule, NbCardModule,
  NbCheckboxModule,
  NbInputModule, NbSpinnerModule,
} from '@nebular/theme';
import { NgxLoginComponent } from './ngx-login/ngx-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import {OtpDialogPromptComponent} from "./dialog/otp-dialog-prompt.component";

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
    NbAccordionModule,
    NbSpinnerModule,
    NbCardModule,
  ],
  declarations: [
  NgxLoginComponent,
  UserRegisterComponent,
  OtpDialogPromptComponent],
})
export class NgxAuthModule {
}
