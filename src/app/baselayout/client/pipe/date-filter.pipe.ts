import {Pipe, PipeTransform} from '@angular/core';
import {UserSessionSummary} from "../models/UserSessionSummary";

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(list: UserSessionSummary[], value: UserSessionSummary): unknown {
    return list.filter(session => session.date === value.date);
  }

}
