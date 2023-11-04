import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Concert } from 'src/app/core/models/concert.model';

@Component({
  selector: 'app-concert-selectable-item',
  templateUrl: './concert-selectable-item.component.html',
  styleUrls: ['./concert-selectable-item.component.scss'],
})
export class ConcertSelectableItemComponent implements OnInit {

  private _concert: Concert | undefined;

  @Input('concert') set concert(_concert: Concert | undefined) {
    this._concert = _concert;
  }

  @Output('clicked') clicked = new EventEmitter();

  get concert(): Concert | undefined {
    return this._concert;
  }

  constructor() { }

  ngOnInit() { }

  onConcertClicked() {
    this.clicked.emit(this._concert);
  }

}
