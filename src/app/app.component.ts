import { Component, OnInit } from '@angular/core';
import {Auth} from "aws-amplify";

@Component({
  selector: 'ngx-app',
  styleUrls: ['app.component.scss'],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    Auth.configure({
      userPoolId: 'us-east-1_TNiPSjD1C',
      userPoolWebClientId: '6bmdj53cntun1pf8hg8b03gvhh',
    });
  }
}
