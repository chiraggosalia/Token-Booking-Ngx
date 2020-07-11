import { Component, OnInit } from '@angular/core';
import {ADMIN_MENU_ITEMS, MENU_ITEMS} from "./main-menu";

@Component({
  selector: 'ngx-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
    let currentUser: any = localStorage.getItem("currentUser");
    if (currentUser) {
      let currentUserJson: any = JSON.parse(currentUser);
      if(currentUserJson.role =='ADMIN') {
        this.menu = ADMIN_MENU_ITEMS;
      }
    }
  }

}
