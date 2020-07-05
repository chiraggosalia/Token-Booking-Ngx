import {Pipe, PipeTransform} from '@angular/core';
import {Sessionfilter} from "../models/sessionfilter";
import {AdminSessionSummary} from "../models/AdminSessionSummary";

@Pipe({
  name: 'adminDateFilter'
})
export class AdminDateFilterPipe implements PipeTransform {

  transform(list: AdminSessionSummary[], value: Sessionfilter): AdminSessionSummary[] {
    value.filterCount = 0;
    if (list !== null) {
      return list.filter(session => {
        if (session.date === value.filterDate) {
          value.filterCount++;
        }
        return session.date === value.filterDate;
      });
    }
  }

}
