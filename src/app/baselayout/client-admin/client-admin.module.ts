import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientAdminComponent } from './client-admin.component';
import { ClientAdminHomeComponent } from './client-admin-home/client-admin-home.component';
import {ClientRoutingModule} from "./client-admin-routing.module";
import {ClientAdminDetailsComponent} from "./client-admin-details/client-admin-details.component";
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSpinnerModule
} from "@nebular/theme";
import {FormsModule} from "@angular/forms";
import {AdminService} from "./services/admin.service";
import {AdminDateFilterPipe} from "./pipe/admin-date-filter.pipe";

@NgModule({
  declarations: [ClientAdminComponent, ClientAdminHomeComponent, ClientAdminDetailsComponent ,AdminDateFilterPipe],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NbCardModule,
    NbAccordionModule,
    NbButtonModule,
    NbDatepickerModule,
    FormsModule,
    NbSpinnerModule,
    NbInputModule
  ],
  providers:[AdminService]
})
export class ClientAdminModule { }