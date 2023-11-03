import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/core/models/artist.model';

@Component({
    selector: 'app-artist-info',
    templateUrl: './artist-info.component.html',
    styleUrls: ['./artist-info.component.scss'],
})
export class ArtistInfoComponent implements OnInit {
    @Input() artist?: Artist;
    constructor() { }

    ngOnInit() { }

}
