import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Concert } from 'src/app/core/models/concert.model';
import { ConcertsService } from 'src/app/core/services/concerts.service';
import { ConcertFormComponent } from './components/concert-form/concert-form.component';

interface ConcertsInterface {
    onCardClicked(concert: Concert): any;
    onUpdate(data: any): any;
    onDeleteClicked(concert: Concert): any;
    onAddConcertClick(event: any): any;
}

@Component({
    selector: 'app-concerts',
    templateUrl: './concerts.page.html',
    styleUrls: ['./concerts.page.scss'],
})
export class ConcertsPage implements OnInit, ConcertsInterface {
    loading = true;

    constructor(
        private router: Router,
        public concertService: ConcertsService,
        private form: ModalController
    ) { }

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

    onCardClicked(concert: Concert) {
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
        this.presentForm(concert, onDismiss);
    }

    async presentForm(data: Concert | null, onDismiss: (data: any) => void) {
        const form = await this.form.create({
            component: ConcertFormComponent,
            componentProps: {
                concert: data
            },
            cssClass: "modal-60vw"
        });
        form.present();
        form.onDidDismiss().then(result => {
            onDismiss(result);
        });
    }

    onUpdate(data: any) {
        this.concertService.updateConcert(data).subscribe({
            next: res => {
                console.log(res);
            },
            error: err => {
                console.error(err);
            }
        });
    }

    onDeleteClicked(concert: Concert) {
        this.concertService.deleteConcert(concert.id).subscribe({
            next: res => {
                console.log(res);
            },
            error: err => {
                console.error(err);
            }
        });
    }

    async onAddConcertClick(event: any) {
        let onDismiss = ((res: any) => {
            if (res.role = "submit") {
                this.concertService.addConcert(res.data).subscribe({
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

}
