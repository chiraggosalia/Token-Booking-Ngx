import { Component, OnInit } from '@angular/core';
import {AppConstant} from "../../app-constant";
import {BookTokenService} from "./services/book-token.service";
import {MdmService} from "./services/mdm.service";
import {ClientNameAndId} from "./models/ClientNameAndId";

@Component({
  selector: 'ngx-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  clientInfo: ClientNameAndId[] = [];
  constructor(private bookTokenService: BookTokenService) { }

  ngOnInit(): void {
    this.clientInfo = [];
    this.bookTokenService.getAllActiveClientNames().subscribe(sessionResponse => {
      this.clientInfo.push(...sessionResponse);
    });
  }

}
