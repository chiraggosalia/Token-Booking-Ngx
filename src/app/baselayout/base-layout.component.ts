import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from "./main-menu";

@Component({
  selector: 'ngx-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
