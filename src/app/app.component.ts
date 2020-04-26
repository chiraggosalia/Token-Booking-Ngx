import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './main-menu';

@Component({
  selector: 'ngx-app',
  styleUrls: ['app.component.scss'],
  template: `<ngx-one-column-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>`,
})
export class AppComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() {
  }

  ngOnInit(): void {
  }
}
