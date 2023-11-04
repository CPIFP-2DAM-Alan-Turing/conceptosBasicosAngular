import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonPopover } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Artist } from 'src/app/core/models/artist.model';
import { Concert } from 'src/app/core/models/concert.model';
import { ConcertsService } from 'src/app/core/services/concerts.service';

export const CONCERT_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ConcertSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-concert-selectable',
  templateUrl: './concert-selectable.component.html',
  styleUrls: ['./concert-selectable.component.scss'],
  providers: [CONCERT_SELECTABLE_VALUE_ACCESSOR]
})
export class ConcertSelectableComponent implements OnInit, ControlValueAccessor {

  concertSelected: Concert | undefined;
  disabled: boolean = false;
  concerts: Concert[] = [];
  private _artist: Artist | null = null;

  @Input() set artist(_artist: Artist | null) {
    this._artist = _artist;
    if (this._artist) {

    }
  }


  propagateChange = (obj: any) => { }

  constructor(
    private concertsService: ConcertsService,
  ) { }

  ngOnInit() { }

  writeValue(obj: any): void {
    this.selectConcert(obj, true);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  async onLoadConcerts() {
    this.concerts = await lastValueFrom(this.concertsService.getAll());
  }

  private async selectConcert(id: number | undefined, propagate: boolean = false) {
    if (id) {
      this.concertSelected = await lastValueFrom(this.concertsService.getConcert(id));
    } else {
      this.concertSelected = undefined;
    }
    if (propagate && this.concertSelected) {
      this.propagateChange(this.concertSelected.id);
    }
  }

  onConcertClicked(popover: IonPopover, concert: Concert) {
    this.selectConcert(concert.id, true);
    popover.dismiss();
  }

  private async filter(value: string) {
    const query = value;
    const concerts = await lastValueFrom(this.concertsService.query(query));
    this.concerts = concerts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  }

  onFilter(evt: any) {
    this.filter(evt.detail.value);
  }

  clearSearch(input: IonInput) {
    input.value = "";
    this.filter("");
  }

  deselect(popover: IonPopover | null = null) {
    this.selectConcert(undefined, true);
    if (popover) {
      popover.dismiss();
    }
  }

}
