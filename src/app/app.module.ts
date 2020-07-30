import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule
} from "@nebular/theme";
import {ThemeModule} from "./@theme/theme.module";
import {AppRoutingModule} from "./app-routing.module";
import {NbAuthModule} from "@nebular/auth";
import {AuthInterceptor} from "./auth-interceptor";
import {AuthuserService} from "./auth/authuser.service";
import {PageReload} from "./baselayout/PageReload";

@NgModule({
  declarations: [AppComponent],
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
    NbAuthModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },AuthuserService,
    PageReload],
})
export class AppModule {
}
