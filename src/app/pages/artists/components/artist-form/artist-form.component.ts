import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Artist } from 'src/app/core/models/artist.model';

@Component({
    selector: 'app-artist-form',
    templateUrl: './artist-form.component.html',
    styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit {
    public form: FormGroup;
    public artistName?: string;
    @Input() set artist(_artist: Artist | null) {
        if (_artist) {
            this.form.controls['id'].setValue(_artist.id);
            this.form.controls['name'].setValue(_artist.name);
            this.form.controls['genre'].setValue(_artist.genre);
            this.form.controls['numFollowers'].setValue(_artist.numFollowers);
            this.form.controls['cache'].setValue(_artist.cache);
            this.form.controls['available'].setValue(_artist.available);
            this.artistName = _artist.name;
        }
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
            available: [true]
        })
    }

    ngOnInit() { }



    /**
     * Submit the form with the artist data
     */
    onSubmit() {
        this.formModal.dismiss(this.form.value, "submit");
    }

    /**
     * Delete artist
     */
    onDelete() {
        this.formModal.dismiss(this.form.value, "delete");
    }

    /**
     * Cancel the updates in modal form
     */
    onCancel() {
        this.formModal.dismiss(undefined, "cancel");
    }
}
