import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {ClientDetailsComponent} from './client/client-details/client-details.component';

export const routes: Routes = [
  /*{path: '**', redirectTo: 'home'},*/
  { path: 'home', component: ClientDetailsComponent},
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
