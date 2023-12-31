import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Artist } from 'src/app/core/models/artist.model';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentsService } from 'src/app/core/services/assignments.service';

@Component({
    selector: 'app-artist-form',
    templateUrl: './artist-form.component.html',
    styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit {
    public form: FormGroup;
    private _artist!: Artist;
    private _assignment!: Assignment;

    @Input() set artist(_artist: Artist) {
        if (_artist) {
            this._artist = _artist;
            this.form.controls['id'].setValue(_artist.id);
            this.form.controls['name'].setValue(_artist.name);
            this.form.controls['genre'].setValue(_artist.genre);
            this.form.controls['numFollowers'].setValue(_artist.numFollowers);
            this.form.controls['cache'].setValue(_artist.cache);
            this.form.controls['available'].setValue(_artist.available);
        }
    }

    @Input() set assignment(_assignment: Assignment) {
        if (_assignment) {
            this._assignment = _assignment;
            this.form.controls['assignmentId'].setValue(_assignment?.id);
            this.form.controls['concertId'].setValue(_assignment?.concert_id);
        }
    }

    public get artist(): Artist {
        return this._artist;
    }

    constructor(
        private fb: FormBuilder,
        private formModal: ModalController
    ) {
        this.form = this.fb.group({
            id: [null],
            name: ['', Validators.required],
            genre: ['', Validators.required],
            numFollowers: [],
            cache: [],
            available: [true],
            concertId: [],
            assignmentId: []
        })
    }

    ngOnInit() { }

    /**
     * Submit the form with the artist data.
     */
    onSubmit() {
        let _role: string = this.form.value.concertId && !this.form.value.assignmentId ? "create" :
            (!this.form.value.concertId && this.form.value.assignmentId ? "delete" :
                (this.form.value.concertId && this.form.value.assignmentId ? "update" : ""))
        let _data = {
            "artist": {
                id: this.form.value.id,
                name: this.form.value.name,
                genre: this.form.value.genre,
                numFollowers: this.form.value.numFollowers,
                cache: this.form.value.cache,
                available: this.form.value.available
            },
            "assignment": this.form.value.assignmentId ? {
                id: this.form.value.assignmentId,
                concert_id: this.form.value.concertId,
                artist_id: this.form.value.id
            } : {
                concert_id: this.form.value.concertId,
                artist_id: this.form.value.id
            },
            role: _role
        }
        this.formModal.dismiss(_data, "submit");
    }

    /**
     * Delete artist.
     */
    onDelete() {
        this.formModal.dismiss(this.form.value, "delete");
    }

    /**
     * Cancel the updates in modal form.
     */
    onCancel() {
        this.formModal.dismiss(undefined, "cancel");
    }
}
