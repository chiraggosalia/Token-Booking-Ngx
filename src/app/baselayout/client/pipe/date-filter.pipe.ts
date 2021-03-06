import {Pipe, PipeTransform} from '@angular/core';
import {UserSessionSummary} from "../models/UserSessionSummary";
import {Sessionfilter} from "../models/sessionfilter";
import {isNull} from "util";

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(list: UserSessionSummary[], value: Sessionfilter): UserSessionSummary[] {
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
