import { Component, OnInit } from '@angular/core';
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'ngx-client-admin-home',
  templateUrl: './client-admin-home.component.html',
  styleUrls: ['./client-admin-home.component.scss']
})
export class ClientAdminHomeComponent implements OnInit {

  constructor(private adminService:AdminService,) { }

  ngOnInit(): void {

  }

}
