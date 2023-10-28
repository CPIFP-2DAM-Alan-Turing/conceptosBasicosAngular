import { Component, Input, OnInit } from '@angular/core';
import { PersonAbout } from 'src/app/core/models/person-about.model';

@Component({
    selector: 'app-about-us-card',
    templateUrl: './about-us-card.component.html',
    styleUrls: ['./about-us-card.component.scss'],
})
export class AboutUsCardComponent implements OnInit {

    @Input() person?: PersonAbout;

    constructor() { }

    ngOnInit() { }

}
