import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Concert } from 'src/app/core/models/concert.model';
import { ConcertsService } from 'src/app/core/services/concerts.service';
import { ConcertFormComponent } from './components/concert-form/concert-form.component';

interface ConcertsInterface {
    onFavClicked(id: number): any;
    onCardClicked(concert: Concert): any;
    onUpdate(data: any): any;
    onDeleteClicked(concert: Concert): any;
    onNewConcertClicked(): any;
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

    onFavClicked(id: number) {
        throw new Error('Method not implemented.');
    }

    onCardClicked(concert: Concert) {
        let onDismiss = (data: any) => {
            // TODO onDismiss: onUpdate() onDeleteClicked()
        }
        this.presentForm(concert, onDismiss);
    }

    async presentForm(data: Concert, onDismiss: (data: any) => void) {
        const form = await this.form.create({
            component: ConcertFormComponent,
            componentProps: {
                concert: data
            },
        });
        form.present();
        form.onDidDismiss().then(result => {
            console.log(result);
            onDismiss(result);
        });
    }

    onUpdate(data: any) {
        throw new Error('Method not implemented.');
    }

    onDeleteClicked(concert: Concert) {
        throw new Error('Method not implemented.');
    }



    onNewConcertClicked() {
        throw new Error('Method not implemented.');
    }



}
