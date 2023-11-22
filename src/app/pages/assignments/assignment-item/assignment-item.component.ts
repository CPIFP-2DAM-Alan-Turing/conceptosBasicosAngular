import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
    @Output() onUpdateClicked: EventEmitter<void> = new EventEmitter<void>;
    @Output() onDeleteClicked: EventEmitter<void> = new EventEmitter<void>;

    get assignment(): Assignment | null {
        return this._assignment;
    }

    constructor(
        private assignmentsService: AssignmentsService,

    ) {
        console.debug("constructor assignment item component")
    }

    ngOnInit() {
        console.debug("init assignment item component")
    }

    onUpdateClick(assignment: Assignment | null, event: any) {
        if (assignment) {
            console.log("edit assignment", assignment.id, event);
        }
    }
    onDeleteClick(assignment: Assignment | null, event: any) {
        if (assignment) {
            console.log("delete assignment", assignment.id, event);
            this.onDeleteClicked.emit();
            event.stopPropagation();
        }
    }
}
