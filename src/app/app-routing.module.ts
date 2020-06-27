import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {DemoComponent} from './client/demo/demo.component';

export const routes: Routes = [
  /*{path: '**', redirectTo: 'home'},*/
  { path: 'home', component: DemoComponent},
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
