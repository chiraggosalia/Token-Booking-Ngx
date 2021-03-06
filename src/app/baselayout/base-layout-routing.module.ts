import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BaseLayoutComponent} from "./base-layout.component";

export const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent,
    children: [
     {path:'client',loadChildren: () => import('./client/client.module')
         .then(m => m.ClientModule)},
      {path:'admin',loadChildren: () => import('./client-admin/client-admin.module')
          .then(m => m.ClientAdminModule)},
      {
        path: '',
        redirectTo: 'client',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class BaseLayoutRoutingModule { }
