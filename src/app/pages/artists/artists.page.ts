import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistsService } from 'src/app/core/services/artists.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.page.html',
    styleUrls: ['./artists.page.scss'],
})
export class ArtistsPage implements OnInit {
    loading = false;
    toggleState: boolean = false;

    constructor(
        private router: Router,
        public artistsService: ArtistsService
    ) { }

    ngOnInit() {
        this.loading = true;
        this.artistsService.getAll().subscribe(artist => {
            this.loading = false;
        });
    }

    home() {
        this.router.navigate(['/home']);
    }

    availableChanged() {
        console.log("AvailableChanged", this.toggleState);
        this.loading = true;
        if (this.toggleState) {
            this.artistsService.getAvailables().subscribe(artist => {
                this.loading = false;
            });
        } else {
            this.artistsService.getAll().subscribe(artist => {
                this.loading = false;
            });
        }
    }
}
