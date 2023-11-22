import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentsService } from 'src/app/core/services/assignments.service';

@Component({
    selector: 'app-assignment-item',
    templateUrl: './assignment-item.component.html',
    styleUrls: ['./assignment-item.component.scss'],
})
export class AssignmentItemComponent implements OnInit {
    private _assignment: Assignment | null = null;
    @Input() public i = 0;
    @Input() set assignment(assignment: Assignment | null) {
        if (assignment) {
            this._assignment = assignment;
        }
    }

    get assignment(): Assignment | null {
        return this._assignment;
    }

    constructor(
        private assignmentsService: AssignmentsService,
        private toastController: ToastController
    ) {
        console.debug("constructor assignment item component")
    }

    ngOnInit() {
        console.debug("init assignment item component")
    }

    onUpdateClick(id: number, event: Event) {
        console.log("edit assignment", id, event);
    }
    onDeleteClick(id: number, event: Event) {
        console.log("delete assignment", id, event);
        this.assignmentsService.deleteAssignment(id).subscribe();
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
