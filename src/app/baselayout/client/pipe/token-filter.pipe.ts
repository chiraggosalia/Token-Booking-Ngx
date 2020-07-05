import {Pipe, PipeTransform} from '@angular/core';
import {UserSessionSummary} from "../models/UserSessionSummary";
import {Sessionfilter} from "../models/sessionfilter";
import {BookingSummary} from "../models/BookingSummary";

@Pipe({
  name: 'tokenFilter'
})
export class TokenFilterPipe implements PipeTransform {

  transform(list: BookingSummary[], tokenFilter: any): BookingSummary[] {
    tokenFilter.count = 0;
    return list.filter(bookingSummary => {
      if (bookingSummary.status == tokenFilter.status) {
        tokenFilter.count++;
      }
      return bookingSummary.status == tokenFilter.status;
    });
  }

}
