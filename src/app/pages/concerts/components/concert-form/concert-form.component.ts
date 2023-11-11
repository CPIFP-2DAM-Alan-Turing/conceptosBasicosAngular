import { Assignment } from 'src/app/core/models/assignment.model';
import { Component, Input } from '@angular/core';
import { Concert } from 'src/app/core/models/concert.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
    selector: 'app-concert-form',
    templateUrl: './concert-form.component.html',
    styleUrls: ['./concert-form.component.scss'],
})
export class ConcertFormComponent {
    public form: FormGroup;
    public concertName?: string;
    private _concert!: Concert;
    private _assignment!: Assignment;

    @Input() set concert(concert: Concert) {
        if (concert) {
            this._concert = concert;
            this.form.controls['id'].setValue(concert.id);
            this.form.controls['name'].setValue(concert.name);
            this.form.controls['image'].setValue(concert.image);
            this.form.controls['description'].setValue(concert.description);
            this.form.controls['locationType'].setValue(concert.locationType);
            this.form.controls['addressType'].setValue(concert.addressType);
            this.form.controls['addressCountry'].setValue(concert.addressCountry);
            this.form.controls['addressLocality'].setValue(concert.addressLocality);
            this.form.controls['addressRegion'].setValue(concert.addressRegion);
            this.form.controls['postalCode'].setValue(concert.postalCode);
            this.form.controls['streetAddress'].setValue(concert.streetAddress);
            this.form.controls['locationName'].setValue(concert.locationName);
            this.form.controls['latitude'].setValue(concert.latitude);
            this.form.controls['longitude'].setValue(concert.longitude);
            this.form.controls['fav'].setValue(concert.fav);
            this.concertName = concert.name;
        }
    }

    public get concert(): Concert {
        return this._concert;
    }

    @Input() set assignment(assignment: Assignment) {
        if (assignment) {
            this._assignment = assignment;
            this.form.controls['assignmentId'].setValue(assignment?.id);
            this.form.controls['artistId'].setValue(assignment?.artist_id);
            this.form.controls['concertDate'].setValue(assignment?.concertDate);
            this.form.controls['ticketSaleDate'].setValue(assignment?.ticketSaleDate);
        }
    }

    public get assignment(): Assignment {
        return this._assignment;
    }

    constructor(
        private fb: FormBuilder,
        private formModal: ModalController
    ) {
        this.form = this.fb.group({
            id: [null],
            name: ['', Validators.required],
            description: [''],
            image: ['', Validators.required],
            locationType: ['', Validators.required],
            addressType: ['', Validators.required],
            locationAddressType: ['', Validators.required],
            artistId: [, Validators.required],
            addressCountry: ['', Validators.required],
            addressLocality: ['', Validators.required],
            addressRegion: ['', Validators.required],
            postalCode: ['', Validators.required],
            streetAddress: ['', Validators.required],
            locationName: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            fav: ['', Validators.required],
            assignmentId: [, Validators.required],
            ticketSaleDate: ['', Validators.required],
            concertDate: ['', Validators.required]
        });
    }

    public onSubmit() {
        let _role: string = this.form.value.artistId && !this.form.value.assignmentId ? "create" :
            (!this.form.value.artistId && this.form.value.assignmentId ? "delete" :
                (this.form.value.artistId && this.form.value.assignmentId ? "update" : ""))
        let _data = {
            "concert": {
                id: this.form.value.id,
                fav: this.form.value.fav,
                name: this.form.value.name,
                description: this.form.value.description,
                image: this.form.value.image == '' ? "assets/images/concerts/default.jpg" : this.form.value.image,
                locationType: this.form.value.locationType,
                addressType: this.form.value.addressType,
                addressCountry: this.form.value.addressCountry,
                addressLocality: this.form.value.addressLocality,
                addressRegion: this.form.value.addressRegion,
                postalCode: this.form.value.postalCode,
                streetAddress: this.form.value.streetAddress,
                latitude: this.form.value.latitude,
                longitude: this.form.value.longitude,
                locationName: this.form.value.locationName,
            },
            "assignment": {
                id: this.form.value.assignmentId ?? null,
                concert_id: this.form.value.id,
                artist_id: this.form.value.artistId,
                concertDate: this.form.value.concertDate,
                ticketSaleDate: this.form.value.ticketSaleDate
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