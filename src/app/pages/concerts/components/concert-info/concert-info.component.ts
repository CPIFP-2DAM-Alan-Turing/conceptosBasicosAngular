import { Component, Input, OnInit } from '@angular/core';
import { Concert } from 'src/app/core/models/concert.model';

@Component({
    selector: 'app-concert-info',
    templateUrl: './concert-info.component.html',
    styleUrls: ['./concert-info.component.scss'],
})
export class ConcertInfoComponent implements OnInit {
    @Input() concert?: Concert;

    constructor() { }

    ngOnInit() { }

}
