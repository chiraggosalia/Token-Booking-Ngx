import {Pipe, PipeTransform} from '@angular/core';
import {UserSessionSummary} from "../models/UserSessionSummary";
import {Sessionfilter} from "../models/sessionfilter";
import {BookingSummary} from "../models/BookingSummary";

@Pipe({
  name: 'tokenFilter'
})
export class TokenFilterPipe implements PipeTransform {

  transform(list: BookingSummary[], status: string): BookingSummary[] {
    return list.filter(bookingSummary => bookingSummary.status == status);
  }

}
