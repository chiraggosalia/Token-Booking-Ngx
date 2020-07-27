import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientDetailsComponent} from './client-details/client-details.component';
import {BookTokenService} from './services/book-token.service';
import {FormsModule} from "@angular/forms";
import {DateFilterPipe} from './pipe/date-filter.pipe';
import {
    NbAccordionModule, NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    NbSpinnerModule, NbTabsetModule, NbTooltipModule
} from "@nebular/theme";
import {ClientRoutingModule} from "./client-routing.module";
import {MdmService} from "./services/mdm.service";
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import {ClientHomeComponent} from "./client-home/client-home.component";
import {ClientComponent} from "./client.component";
import {ManageBookingService} from "./services/manage-booking.service";
import { TokenInfoComponent } from './token-info/token-info.component';
import {TokenFilterPipe} from "./pipe/token-filter.pipe";

@NgModule({
  declarations: [ClientDetailsComponent, DateFilterPipe, TokenFilterPipe, ClientHomeComponent, ManageBookingComponent, ClientComponent, TokenInfoComponent],
    imports: [
        CommonModule,
        FormsModule,
        NbAccordionModule,
        NbButtonModule,
        NbCardModule,
        NbDatepickerModule,
        NbInputModule,
        ClientRoutingModule,
        NbSpinnerModule,
        NbTabsetModule,
        NbTooltipModule,
        NbBadgeModule,
    ],
  providers: [BookTokenService,MdmService,ManageBookingService],

})
export class ClientModule {
}
