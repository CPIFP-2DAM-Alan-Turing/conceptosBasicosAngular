import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { lastValueFrom, zip } from 'rxjs';
import { Artist } from 'src/app/core/models/artist.model';
import { Assignment } from 'src/app/core/models/assignment.model';
import { ArtistsService } from 'src/app/core/services/artists.service';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
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
    public loading = false;
    toggleState: boolean = false;

    constructor(
        private router: Router,
        public artistsService: ArtistsService,
        private form: ModalController,
        private assignmentsService: AssignmentsService
    ) { }

    async ngOnInit() {
        this.loading = true;
        await lastValueFrom(this.artistsService.getAll())
            .catch((error: any) => {
                console.error(error);
            });
        this.loading = false;
    }

    /**
    * Navigate to home page.
    */
    home() {
        this.router.navigate(['/home']);
    }

    /**
     * Update the artists list if toggle available is changed.
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
     * Add new Artist.
     * @param $event Mouse Event.
     */
    onAddArtistClick(event: any) {
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
        event.stopPropagation();
    }

    /**
     * Open a modal window with the detail of the artist.
     * @param artist Artist to show the data.
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
     * Update the artist data passed by parameter.
     * @param data Data to update.
     */
    onUpdate(data: any) {
        this.createOrUpdate(data);
    }

    private createOrUpdate(data: any) {
        let assigmentObs;
        switch (data.role) {
            case "create":
                assigmentObs = this.assignmentsService.addAssignment(data.assignment);
                break;
            case "update":
                assigmentObs = this.assignmentsService.updateAssignment(data.assignment);
                break;
            case "delete":
                assigmentObs = this.assignmentsService.deleteAssignment(data.assignment.id);
                break;
            default:
        }
        if (assigmentObs) {
            zip(this.artistsService.updateArtist(data.artist, this.toggleState), assigmentObs)
                .subscribe({
                    next: res => {
                        console.log(res);
                    },
                    error: err => {
                        console.error(err);
                    }
                });
        } else {
            this.artistsService.updateArtist(data.artist, this.toggleState)
                .subscribe({
                    next: res => {
                        console.log(res);
                    },
                    error: err => {
                        console.error(err);
                    }
                });
        }
    }

    /**
     * Delete the artist passed by parameter.
     * @param artist Artist to delete.
     */
    onDeleteClicked(artist: Artist) {
        this.artistsService.deleteArtist(artist.id, this.toggleState).subscribe({
            next: res => {
                console.log(res);
            },
            error: err => {
                console.error(err);
            }
        });
    }

    /**
     * Create the modal form of artists.
     * @param data Artist to show in the modal.
     * @param onDismiss Data to onDismiss function.
     */
    presentForm(data: Artist | null, onDismiss: (data: any) => void) {
        this.assignmentsService.getAll().subscribe(async res => {
            let assignment = res.find(a => a.artist_id === data?.id)

            const form = await this.form.create({
                component: ArtistFormComponent,
                componentProps: {
                    artist: data,
                    assignment: assignment
                },
                cssClass: "modal-60vw modal-50vh"
            });
            form.present();
            form.onDidDismiss().then(result => {
                onDismiss(result);
            });
        });
    }
}
