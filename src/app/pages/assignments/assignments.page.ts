import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Assignment } from 'src/app/core/models/assignment.model';
import { ArtistsService } from 'src/app/core/services/artists.service';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { ConcertsService } from 'src/app/core/services/concerts.service';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.page.html',
    styleUrls: ['./assignments.page.scss'],
})
export class AssignmentsPage implements OnInit {
    public loading = false;

    constructor(
        private form: ModalController,
        private router: Router,
        private toastController: ToastController,
        public artistsSvc: ArtistsService,
        public assignmentsSvc: AssignmentsService,
        public concertsSvc: ConcertsService,
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

    }

    onUpdateClicked(data: any) {

    }

    onDeleteClicked(assignment: Assignment) {
        this.assignmentsSvc.deleteAssignment(assignment.id).subscribe();
        this.showToast("La asignación ha sido eliminada")
    }

    async showToast(_message: string) {
        const toast = await this.toastController.create({
            message: _message,
            duration: 2000,
            position: "bottom",
            color: "danger"
        });
        toast.present();
    }
}
