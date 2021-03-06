import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbAuthComponent, NbRegisterComponent,
} from '@nebular/auth';
import {NgxLoginComponent} from './ngx-login/ngx-login.component';
import {UserRegisterComponent} from "./user-register/user-register.component";
import {ForgotpasswordComponent} from "./forgotpassword/forgotpassword.component";

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'register',
        component: UserRegisterComponent,
      },
      {
        path: 'forgotpassword',
        component: ForgotpasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
