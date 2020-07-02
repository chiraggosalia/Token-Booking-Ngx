import { Injectable } from '@angular/core';
import {AppConstant} from "../../../app-constant";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MdmService {
  serverURL = AppConstant.serverURL;
  baseURL = this.serverURL + "/mdmapi"
  constructor(private _http : HttpClient) { }

}
