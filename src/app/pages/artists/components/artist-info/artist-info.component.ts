import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from 'src/app/core/models/artist.model';

@Component({
    selector: 'app-artist-info',
    templateUrl: './artist-info.component.html',
    styleUrls: ['./artist-info.component.scss'],
})
export class ArtistInfoComponent implements OnInit {
    @Input() artist?: Artist;
    @Output() onCardClicked: EventEmitter<void> = new EventEmitter<void>;

    constructor() { }

    ngOnInit() { }

    onCardClick() {
        console.log("onCardClick");
        this.onCardClicked.emit();
    }
}
