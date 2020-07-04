import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbMenuModule} from "@nebular/theme";
import {ThemeModule} from "../@theme/theme.module";
import {BaseLayoutComponent} from "./base-layout.component";
import {RouterModule} from "@angular/router";
import {BaseLayoutRoutingModule} from "./base-layout-routing.module";

@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    RouterModule,
    BaseLayoutRoutingModule,
  ]
})
export class BaseLayoutModule { }
