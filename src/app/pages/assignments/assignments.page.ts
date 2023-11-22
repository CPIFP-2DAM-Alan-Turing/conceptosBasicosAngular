import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Assignment } from 'src/app/core/models/assignment.model';
import { ArtistsService } from 'src/app/core/services/artists.service';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { ConcertsService } from 'src/app/core/services/concerts.service';
import { AssignmentFormComponent } from './components/assignment-form/assignment-form.component';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.page.html',
    styleUrls: ['./assignments.page.scss'],
})
export class AssignmentsPage implements OnInit {
    public loading = false;

    constructor(
        private modal: ModalController,
        private router: Router,
        private toastController: ToastController,
        public artistsSvc: ArtistsService,
        public assignmentsSvc: AssignmentsService,
        public concertsSvc: ConcertsService
    ) { }

    async ngOnInit() {
        this.loading = true;
        await lastValueFrom(this.assignmentsSvc.getAll())
            .catch((error: any) => {
                console.error(error);
            });
        this.loading = false;
    }


    /**
    * Navigate to home page
    */
    home() {
        this.router.navigate(['/home']);
    }

    onAddAssignmentClick(event: any) {
        console.log("onAddAssignmentClick");
        let onDismiss = ((info: any) => {
            if (info.role = "submit") {
                this.assignmentsSvc.addAssignment(info.data.assignment).subscribe({
                    next: info => {
                        console.log("AddConcertClick: " + info);
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

    onUpdateClicked(assignment: Assignment) {
        console.log("onUpdateClicked")
        var onDismiss = (info: any) => {
            switch (info.data.role) {
                case 'update': {
                    this.assignmentsSvc.updateAssignment(info.data.assignment).subscribe(async assignment => {
                        this.showToast("Asignación de concierto y artista modificada", "success")
                    })
                }
                    break;
                case 'delete': {
                    this.onDeleteClicked(assignment);
                }
                    break;
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentForm(assignment, onDismiss);
    }

    async presentForm(assignment: Assignment | null, onDismiss: (result: any) => void) {
        const modal = await this.modal.create({
            component: AssignmentFormComponent,
            componentProps: {
                assignment: assignment
            },
            cssClass: "modal-60vw modal-80vh"
        });
        modal.present();
        modal.onDidDismiss().then(result => {
            if (result && result.data) {
                onDismiss(result);
            }
        });
    }



    onDeleteClicked(assignment: Assignment) {
        this.assignmentsSvc.deleteAssignment(assignment.id).subscribe();
        this.showToast("La asignación ha sido eliminada", "danger")
    }

    async showToast(_message: string, color: string) {
        const toast = await this.toastController.create({
            message: _message,
            duration: 2000,
            position: "bottom",
            color: color
        });
        toast.present();
    }
}
