import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {ClientAdminComponent} from "./client-admin.component";
import {ClientAdminHomeComponent} from "./client-admin-home/client-admin-home.component";
import {ActiveSessionComponent} from "./active-session/active-session.component";

export const routes: Routes = [
  {path: '', component: ClientAdminComponent,
    children: [{path:'', redirectTo:'home'},
              {path:'home', component: ClientAdminHomeComponent},
              {path:'activesession/:id', component: ActiveSessionComponent}]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
