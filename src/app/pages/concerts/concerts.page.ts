import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Concert } from 'src/app/core/models/concert.model';
import { ConcertFormComponent } from './components/concert-form/concert-form.component';
import { ConcertsService } from 'src/app/core/services/concerts.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription, zip } from 'rxjs';
import { Assignment } from 'src/app/core/models/assignment.model';


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
export class ConcertsPage implements OnInit, ConcertsInterface, OnDestroy {
    public loading = true;
    private _assignments?: Assignment[];
    private _subs: Subscription[] = []

    constructor(
        private router: Router,
        public concertService: ConcertsService,
        private form: ModalController,
        private assignmentSvc: AssignmentsService
    ) { }

    ngOnInit() {
        this.loading = true;
        this._subs.push(
            zip(
                this.concertService.getAll(),
                this.assignmentSvc.getAll()
            ).subscribe(res => {
                this._assignments = res[1];
                this.loading = false;
            }));
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
        console.log("onUpdate: " + JSON.stringify(data));
        this.createOrUpdate(data);
    }


    private createOrUpdate(data: any) {
        let assigmentObs;
        switch (data.role) {
            case "create":
                assigmentObs = this.assignmentSvc.addAssignment(data.assignment);
                break;
            case "update":
                assigmentObs = this.assignmentSvc.updateAssignment(data.assignment);
                break;
            case "delete":
                assigmentObs = this.assignmentSvc.deleteAssignment(data.assignment.id);
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

    async presentForm(data: Concert | null, onDismiss: (data: any) => void) {
        let assignment = this._assignments?.find(c => c.concert_id === data?.id);
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
    }

    ngOnDestroy(): void {
        this._subs.forEach(s => s.unsubscribe());
    }
}
