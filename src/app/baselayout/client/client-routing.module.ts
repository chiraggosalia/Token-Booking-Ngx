import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {ClientHomeComponent} from "./client-home.component";

export const routes: Routes = [
  {path: '', component: ClientHomeComponent, children: []},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
