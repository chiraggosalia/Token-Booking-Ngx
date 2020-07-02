import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {ClientComponent} from "./client.component";
import {ManageBookingComponent} from "./manage-booking/manage-booking.component";
import {ClientHomeComponent} from "./client-home/client-home.component";

export const routes: Routes = [
  {path: '', component: ClientComponent,
    children: [{path:'', redirectTo:'home'},
              {path:'home', component: ClientHomeComponent},
              {path:'managebooking', component: ManageBookingComponent}]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
