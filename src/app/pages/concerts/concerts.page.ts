import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/core/models/concert.model';
import { ConcertFormComponent } from './components/concert-form/concert-form.component';
import { ConcertsService } from 'src/app/core/services/concerts.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { zip } from 'rxjs';


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
        private form: ModalController,
        private assignmentsService: AssignmentsService
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

    onAddConcertClick(event: any) {
        let onDismiss = ((res: any) => {
            if (res.role = "submit") {
                this.concertService.addConcert(res.data).subscribe({
                    next: res => {
                        console.log("AddConcertClick: " + res);
                    },
                    error: err => {
                        console.error("AddConcertClick: " + err);
                    }
                });
            }
        })
        this.presentForm(null, onDismiss);
        event.stopPropagation();
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

    /**
 * Update the artist data passed by parameter.
 * @param data Data to update.
 */
    onUpdate(data: any) {
        console.log("onUpdate: " + data);
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
            zip(this.concertService.updateConcert(data.concert), assigmentObs)
                .subscribe({
                    next: res => {
                        console.log("createOrUpdate zip: " + res);
                    },
                    error: err => {
                        console.error("createOrUpdate zip: " + err);
                    }
                });
        } else {
            this.concertService.updateConcert(data.concert)
                .subscribe({
                    next: res => {
                        console.log("createOrUpdate data.concert: " + res);
                    },
                    error: err => {
                        console.error("createOrUpdate data.concert: " + err);
                    }
                });
        }
    }

    onDeleteClicked(concert: Concert) {
        this.concertService.deleteConcert(concert.id).subscribe({
            next: res => {
                console.log("onDeleteClicked: " + res);
            },
            error: err => {
                console.error("onDeleteClicked: " + err);
            }
        });
    }

    presentForm(data: Concert | null, onDismiss: (data: any) => void) {
        this.assignmentsService.getAll().subscribe(async res => {
            let assignment = res.find(c => c.concert_id === data?.id)
            const form = await this.form.create({
                component: ConcertFormComponent,
                componentProps: {
                    concert: data,
                    assignment: assignment
                },
                cssClass: "modal-60vw"
            });
            form.present();
            form.onDidDismiss().then(result => {
                onDismiss(result);
            });
        });
    }









}
