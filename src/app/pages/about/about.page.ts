import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PERSONS_ABOUT } from 'src/app/core/data/person-about-data';
import { PersonAbout } from 'src/app/core/models/person-about.model';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
    public persons: PersonAbout[];

    constructor(private router: Router) {
        this.persons = PERSONS_ABOUT;
    }

    ngOnInit() {
    }

    /**
     * Navigate to home page
     */
    home() {
        this.router.navigate(['/home']);
    }
}
