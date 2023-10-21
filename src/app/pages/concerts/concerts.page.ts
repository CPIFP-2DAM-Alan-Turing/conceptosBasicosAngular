import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcertsService } from 'src/app/core/services/concerts.service';

@Component({
    selector: 'app-concerts',
    templateUrl: './concerts.page.html',
    styleUrls: ['./concerts.page.scss'],
})
export class ConcertsPage implements OnInit {
    loading = true;

    constructor(
        private router: Router,
        public concertService: ConcertsService) { }

    ngOnInit() {
        this.loading = true;
        this.concertService.getAll().subscribe((c) => {
            this.loading = false;
        });
    }

    /**
    * Navigate to home page
    */
    home() {
        this.router.navigate(['/home']);
    }

}
