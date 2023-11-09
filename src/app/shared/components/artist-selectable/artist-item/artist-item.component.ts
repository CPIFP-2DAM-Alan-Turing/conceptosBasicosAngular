import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from 'src/app/core/models/artist.model';

@Component({
    selector: 'app-artist-item',
    templateUrl: './artist-item.component.html',
    styleUrls: ['./artist-item.component.scss'],
})
export class ArtistItemComponent implements OnInit {
    private _artist: Artist | undefined;
    @Input('artist') set artist(_artist: Artist | undefined) {
        this._artist = _artist;
    }
    @Output('clicked') clicked = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    /**
    * Returns the artist associated with this component.
    * @returns The artist, or `undefined` if no artist is set.
    */
    get artist(): Artist | undefined {
        return this._artist;
    }

    /**
    * Emits an event when the artist is clicked.
    * @param artist The artist that was clicked.
    */
    onArtistClicked() {
        this.clicked.emit(this._artist);
    }
}
