import { Assignment } from 'src/app/core/models/assignment.model';
import { Component, Input, OnInit } from '@angular/core';
import { Concert } from 'src/app/core/models/concert.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
    selector: 'app-concert-form',
    templateUrl: './concert-form.component.html',
    styleUrls: ['./concert-form.component.scss'],
})
export class ConcertFormComponent implements OnInit {
    public form: FormGroup;
    public concertName?: string;
    private _concert!: Concert;
    private _assignment!: Assignment;

    @Input() set concert(_concert: Concert) {
        if (_concert) {
            this._concert=_concert;
            this.form.controls['id'].setValue(_concert.id);
            this.form.controls['name'].setValue(_concert.name);
            this.form.controls['description'].setValue(_concert.description);
            this.form.controls['concertDate'].setValue(_concert.concertDate);
            this.form.controls['ticketSaleDate'].setValue(_concert.ticketSaleDate);
            this.form.controls['artistId'].setValue(_concert.artistId);
            this.form.controls['locationType'].setValue(_concert.locationType);
            this.form.controls['locationAddressType'].setValue(_concert.addressType);
            this.form.controls['addressCountry'].setValue(_concert.addressCountry);
            this.form.controls['addressLocality'].setValue(_concert.addressLocality);
            this.form.controls['addressRegion'].setValue(_concert.addressRegion);
            this.form.controls['postalCode'].setValue(_concert.postalCode);
            this.form.controls['streetAddress'].setValue(_concert.streetAddress);
            this.form.controls['locationName'].setValue(_concert.locationName);
            this.concertName = _concert.name;
        }
    }
    @Input() set assignment(_assignment: Assignment) {
        if (_assignment) {
            this._assignment = _assignment;
            this.form.controls['assignmentId'].setValue(_assignment?.id);
            this.form.controls['artistId'].setValue(_assignment?.artist_id);
        }
    }

    constructor(
        private fb: FormBuilder,
        private formModal: ModalController
    ) {
        this.form = this.fb.group({
            id: [null],
            name: ['', Validators.required],
            description: [''],
            locationType: ['', Validators.required],
            locationAddressType: ['', Validators.required],
            ticketSaleDate: ['', Validators.required],
            concertDate: ['', Validators.required],
            artistId: [],
            addressCountry: ['', Validators.required],
            addressLocality: ['', Validators.required],
            addressRegion: ['', Validators.required],
            postalCode: ['', Validators.required],
            streetAddress: ['', Validators.required],
            locationName: ['', Validators.required],
            assignmentId: []
        });
    }

    ngOnInit() { }

    public get concert(): Concert {
        return this._concert;
    }

    public onSubmit() {
        console.log("artist_id:",this.form.value.artist_id);
        console.log("assignmentId:",this.form.value.assignmentId);
        let _role: string = this.form.value.artistId && !this.form.value.assignmentId ? "create" :
            (!this.form.value.artistId && this.form.value.assignmentId ? "delete" :
                (this.form.value.artistId && this.form.value.assignmentId ? "update" : ""))
        let _data = {
            "concert": {
                id: this.form.value.id,
                name: this.form.value.name,
                description: this.form.value.description,
                ticketSaleDate: this.form.value.ticketSaleDate,
                concertDate: this.form.value.concertDate,
                concertId: this.form.value.concertId,
                locationType: this.form.value.locationType,
                addressType: this.form.value.addressType,
                addressCountry: this.form.value.addressCountry,
                addressRegion: this.form.value.addressRegion,
                postalCode: this.form.value.postalCode,
                streetAddress: this.form.value.streetAddress,
                latitude: this.form.value.latitude,
                longitude: this.form.value.longitude,
                locationName: this.form.value.locationName,
            },
            "assignment": this.form.value.assignmentId ? {
                id: this.form.value.assignmentId,
                concert_id: this.form.value.id,
                artist_id: this.form.value.artistId
            } : {
                concert_id: this.form.value.id,
                artist_id: this.form.value.artistId
            },
            role: _role
        }
        this.formModal.dismiss(_data, "submit");
    }

    public onCancel() {
        this.formModal.dismiss(undefined, "cancel");
    }

    public onDelete() {
        this.formModal.dismiss(this.form.value, "delete");
    }
}