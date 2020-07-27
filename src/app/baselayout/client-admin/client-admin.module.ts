import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientAdminComponent } from './client-admin.component';
import { ClientAdminHomeComponent } from './client-admin-home/client-admin-home.component';
import {ClientRoutingModule} from "./client-admin-routing.module";
import {ClientAdminDetailsComponent} from "./client-admin-details/client-admin-details.component";
import {
    NbAccordionModule, NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule, NbIconModule,
    NbInputModule,
    NbSpinnerModule
} from "@nebular/theme";
import {FormsModule} from "@angular/forms";
import {AdminService} from "./services/admin.service";
import {AdminDateFilterPipe} from "./pipe/admin-date-filter.pipe";
import { ActiveSessionComponent } from './active-session/active-session.component';

@NgModule({
  declarations: [ClientAdminComponent, ClientAdminHomeComponent, ClientAdminDetailsComponent ,AdminDateFilterPipe, ActiveSessionComponent],
    imports: [
        CommonModule,
        ClientRoutingModule,
        NbCardModule,
        NbAccordionModule,
        NbButtonModule,
        NbDatepickerModule,
        FormsModule,
        NbSpinnerModule,
        NbInputModule,
        NbIconModule,
        NbBadgeModule
    ],
  providers:[AdminService]
})
export class ClientAdminModule { }
