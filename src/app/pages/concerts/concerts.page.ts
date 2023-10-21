import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Concert } from 'src/app/core/models/concert.model';
import { ConcertsService } from 'src/app/core/services/concerts.service';
import { ConcertFormComponent } from './components/concert-form/concert-form.component';

@Component({
    selector: 'app-concerts',
    templateUrl: './concerts.page.html',
    styleUrls: ['./concerts.page.scss'],
})
export class ConcertsPage implements OnInit {
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
        let onDismiss = (data: any) => {
            // TODO onDismiss
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

}
