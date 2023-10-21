import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Concert } from 'src/app/core/models/concert.model';

@Component({
    selector: 'app-concert-info',
    templateUrl: './concert-info.component.html',
    styleUrls: ['./concert-info.component.scss'],
})
export class ConcertInfoComponent implements OnInit {
    @Input() concert?: Concert;
    @Output() onCardClicked: EventEmitter<void> = new EventEmitter<void>;

    constructor() { }

    ngOnInit() { }

    changeFav() {
        this.concert!.fav = !this.concert?.fav;
    }
    
    onCardClick(event:any) {
        this.onCardClicked.emit();
        event.stopPropagation();
    }

}
