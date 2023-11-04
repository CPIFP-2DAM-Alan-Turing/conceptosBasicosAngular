import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Artist } from 'src/app/core/models/artist.model';
import { ArtistsService } from 'src/app/core/services/artists.service';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';

interface ArtistsInterface {
    onCardClicked(artist: Artist): any;
    onUpdate(data: any): any;
    onDeleteClicked(artist: Artist): any;
    onAddArtistClick(event: any): any;
}

@Component({
    selector: 'app-artists',
    templateUrl: './artists.page.html',
    styleUrls: ['./artists.page.scss'],
})

export class ArtistsPage implements OnInit, ArtistsInterface {
    loading = false;
    toggleState: boolean = false;

    constructor(
        private router: Router,
        public artistsService: ArtistsService,
        private form: ModalController
    ) { }

    ngOnInit() {
        this.loading = true;
        this.artistsService.getAll().subscribe(artist => {
            this.loading = false;
        });
    }

    /**
    * Navigate to home page
    */
    home() {
        this.router.navigate(['/home']);
    }

    /**
     * Update the artists list if toggle available is changed
     */
    availableChanged() {
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

    /**
     * Add new Artist
     * @param $event
     */
    onAddArtistClick($event: MouseEvent) {
        console.log("onAddArtistClick");
        let onDismiss = ((res: any) => {
            if (res.role = "submit") {
                this.artistsService.addArtist(res.data).subscribe({
                    next: res => {
                        console.log(res);
                    },
                    error: err => {
                        console.error(err);
                    }
                });
            }
        })
        this.presentForm(null, onDismiss);
        event?.stopPropagation();
    }

    /**
     * Open a modal window with the detail of the artist
     * @param artist
     */
    onCardClicked(artist: Artist) {
        console.log("onCardClicked");
        let onDismiss = (res: any) => {
            switch (res.role) {
                case "submit":
                    this.onUpdate(res.data);
                    break;
                case "delete":
                    this.onDeleteClicked(res.data);
                    break;
                default:
            }
        }
        this.presentForm(artist, onDismiss);
    }

    /**
     * Update the artist data
     * @param data
     */
    onUpdate(data: any) {
        throw new Error('Method not implemented.');
    }

    /**
     * Delete the artist
     */
    onDeleteClicked(artist: Artist) {
        throw new Error('Method not implemented.');
    }

    /**
     * Create the modal form of artists
     * @param data
     * @param onDismiss
     */
    async presentForm(data: Artist | null, onDismiss: (data: any) => void) {
        const form = await this.form.create({
            component: ArtistFormComponent,
            componentProps: {
                artist: data
            },
        });
        form.present();
        form.onDidDismiss().then(result => {
            onDismiss(result);
        });
    }
}
