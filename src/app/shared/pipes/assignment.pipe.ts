import { Pipe, PipeTransform } from '@angular/core';
import { Assignment } from 'src/app/core/models/assignment.model';
import { Concert } from 'src/app/core/models/concert.model';

@Pipe({
  name: 'assignment'
})
export class AssignmentPipe implements PipeTransform {

  transform(concert?: Concert, args?: [Assignment[] | null, string]): string {
    let date;
    let assignments;
    let dateType;

    if (args) {
      assignments = args[0];
      dateType = args[1];
    }
    if (concert && assignments) {
      let assignment = assignments.find(c => c.concert_id === concert.id)
      if (dateType == "saleDate") {
        date = assignment?.ticketSaleDate;
      } else if (dateType == "concertDate") {
        date = assignment?.concertDate;
      }
    }
    return date ?? "";
  }

}
