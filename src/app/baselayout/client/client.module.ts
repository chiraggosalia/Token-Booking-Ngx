import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientDetailsComponent} from './client-details/client-details.component';
import {BookTokenService} from './services/book-token.service';
import {FormsModule} from "@angular/forms";
import {DateFilterPipe} from './pipe/date-filter.pipe';
import {ClientHomeComponent} from './client-home.component';
import {NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule} from "@nebular/theme";
import {ClientRoutingModule} from "./client-routing.module";
import {MdmService} from "./services/mdm.service";


@NgModule({
  declarations: [ClientDetailsComponent, DateFilterPipe, ClientHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    ClientRoutingModule,
  ],
  providers: [BookTokenService,MdmService],

})
export class ClientModule {
}
