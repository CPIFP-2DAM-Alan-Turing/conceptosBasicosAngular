import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcertsService } from 'src/app/core/services/concerts.service';

@Component({
    selector: 'app-concerts',
    templateUrl: './concerts.page.html',
    styleUrls: ['./concerts.page.scss'],
})
export class ConcertsPage implements OnInit {

    constructor(private router: Router,
        public concertService: ConcertsService) { }

    ngOnInit() {
        this.concertService.getAll().subscribe();
    }

    /**
    * Navigate to home page
    */
    home() {
        this.router.navigate(['/home']);
    }

}
