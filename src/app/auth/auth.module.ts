import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import {
  NbAccordionModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxLoginComponent } from './ngx-login/ngx-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

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
  ],
  declarations: [
  NgxLoginComponent,
  UserRegisterComponent],
})
export class NgxAuthModule {
}
