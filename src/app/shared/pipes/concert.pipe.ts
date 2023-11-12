import { Pipe, PipeTransform } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ConcertsService } from 'src/app/core/services/concerts.service';

@Pipe({
  name: 'concert'
})
export class ConcertPipe implements PipeTransform {
  private _concert: any;

  constructor(
    private concertSvc: ConcertsService
  ) { }

 async transform(concert_id?: number): Promise<string> {
    if (concert_id) {
      this._concert = await lastValueFrom(this.concertSvc.getConcert(concert_id))
        .catch((error: any) => {
          console.error(error);
        });
    }
    return this._concert ? this._concert.name : "";
  }

}
