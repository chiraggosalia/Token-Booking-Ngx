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
   /* Auth.configure({
      userPoolId: 'ap-south-1_xmdy222gH',
      userPoolWebClientId: 'k0di7cjq19702m71fbfeg04j2',
    });*/

    Auth.configure({
      userPoolId: 'us-east-1_ZUmlSYSUU',
      userPoolWebClientId: '59h2prt9hdplutdlduhj9f58of',
    });
  }
}
