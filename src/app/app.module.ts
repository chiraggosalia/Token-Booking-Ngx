import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbAccordionModule, NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule, NbInputModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { DemoComponent } from './client/demo/demo.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import {BookTokenService} from "./services/book-token.service";
import {FormsModule} from "@angular/forms";
import { DateFilterPipe } from './pipe/date-filter.pipe';

@NgModule({
  declarations: [AppComponent, DemoComponent, ClientDetailsComponent, DateFilterPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    ThemeModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbAccordionModule,
    NbButtonModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [BookTokenService],
})
export class AppModule {
}
