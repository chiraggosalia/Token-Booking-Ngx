import { Component, OnInit} from '@angular/core';
import {AuthuserService} from '../authuser.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './ngx-login.component.html',
  styleUrls: ['./ngx-login.component.scss'],
})
export class NgxLoginComponent implements OnInit {

  user: any = {};
  submitted: boolean = false;

  constructor(private authuserService:AuthuserService) {
  }

  ngOnInit(): void {

  }

  login() {
    this.authuserService.authenticate(this.user).subscribe(result => {
      console.log(result);
    });
  }

}
