import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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
        private router: Router,
        public concertsSvc: ConcertsService,
        public artistsSvc: ArtistsService,
        public assignmentSvc: AssignmentsService,
        private form: ModalController,
    ) { }

    async ngOnInit() {
        this.loading = true;
        await lastValueFrom(this.assignmentSvc.getAll())
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

    }

}
