import { Component, OnInit } from '@angular/core';
import {ClientNameAndId} from "../models/ClientNameAndId";
import {BookTokenService} from "../services/book-token.service";

@Component({
  selector: 'ngx-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  clientInfos: ClientNameAndId[] = [];
  constructor(private bookTokenService: BookTokenService) { }

  ngOnInit(): void {
    this.clientInfos = [];
    this.bookTokenService.getAllActiveClientNames().subscribe(sessionResponse => {
      this.clientInfos.push(...sessionResponse);
    });
  }

}
