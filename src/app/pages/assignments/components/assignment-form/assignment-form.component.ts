import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Assignment } from 'src/app/core/models/assignment.model';

@Component({
    selector: 'app-assignment-form',
    templateUrl: './assignment-form.component.html',
    styleUrls: ['./assignment-form.component.scss'],
})
export class AssignmentFormComponent implements OnInit {

    form: FormGroup;

    mode: 'New' | 'Edit' = 'New';
    @Input() set assignment(_assignment: Assignment | null) {
        if (_assignment) {
            this.mode = 'Edit';
            this.form.controls['assignmentId'].setValue(_assignment.id);
            this.form.controls['concertId'].setValue(_assignment.concert_id);
            this.form.controls['artistId'].setValue(_assignment.artist_id);
            this.form.controls['concertDate'].setValue(_assignment.concertDate);
            this.form.controls['ticketSaleDate'].setValue(_assignment.ticketSaleDate);
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private _modal: ModalController,
    ) {
        this.form = this.formBuilder.group({
            assignmentId: this.assignment?.id,
            concertId: ['', [Validators.required]],
            artistId: ['', [Validators.required]],
            concertDate: ['', [Validators.required]],
            ticketSaleDate: [Validators.required],
        })
    }

    ngOnInit() { }

    onCancel() {
        this._modal.dismiss(null, 'cancel');
    }

    public onSubmit() {
        let _role: string = this.form.value.artistId && !this.form.value.assignmentId ? "create" :
            (!this.form.value.artistId && this.form.value.assignmentId ? "delete" :
                (this.form.value.artistId && this.form.value.assignmentId ? "update" : ""))
        console.log(_role)
        let _data = {
            "assignment": {
                id: this.form.value.assignmentId ?? null,
                concert_id: this.form.value.concertId,
                artist_id: this.form.value.artistId,
                concertDate: this.form.value.concertDate,
                ticketSaleDate: this.form.value.ticketSaleDate
            },
            role: _role
        }
        this._modal.dismiss(_data, _role);
    }
    onDelete() {
        this._modal.dismiss(this.form.value, 'delete');
    }
}
