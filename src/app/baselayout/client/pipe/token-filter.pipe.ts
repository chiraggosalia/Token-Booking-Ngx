import {Pipe, PipeTransform} from '@angular/core';
import {BookingSummary} from "../models/BookingSummary";

@Pipe({
  name: 'tokenFilter',
})
export class TokenFilterPipe implements PipeTransform {

  transform(list: BookingSummary[], tokenFilter: any): BookingSummary[] {
    tokenFilter.count = 0;
    return list.filter(bookingSummary => {
      const statusToFilter = tokenFilter.status;
      if (statusToFilter.includes(bookingSummary.status)) {
        tokenFilter.count++;
        return true;
      }
      return false;
    });
  }

}
