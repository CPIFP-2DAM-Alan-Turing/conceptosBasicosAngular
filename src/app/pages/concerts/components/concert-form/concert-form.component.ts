import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Concert } from 'src/app/core/models/concert.model';


@Component({
    selector: 'app-concert-form',
    templateUrl: './concert-form.component.html',
    styleUrls: ['./concert-form.component.scss'],
})
export class ConcertFormComponent implements OnInit {
    public form: FormGroup;
    @Input() set concert(_concert: Concert | null) {
        if (_concert) {
            this.form.controls['id'].setValue(_concert.id);
            this.form.controls['name'].setValue(_concert.name);
            this.form.controls['description'].setValue(_concert.description);
            this.form.controls['concertDate'].setValue(_concert.concertDate);
            this.form.controls['ticketSaleDate'].setValue(_concert.ticketSaleDate);
            this.form.controls['locationType'].setValue(_concert.locationType);
            this.form.controls['locationAddressType'].setValue(_concert.addressType);
            this.form.controls['addressCountry'].setValue(_concert.addressCountry);
            this.form.controls['addressLocality'].setValue(_concert.addressLocality);
            this.form.controls['addressRegion'].setValue(_concert.addressRegion);
            this.form.controls['postalCode'].setValue(_concert.postalCode);
            this.form.controls['streetAddress'].setValue(_concert.streetAddress);
            this.form.controls['locationName'].setValue(_concert.locationName);
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
            concertDate: ['', [Validators.required, ]],
            ticketSaleDate: ['', Validators.required],
            addressCountry: ['', Validators.required],
            addressLocality: ['', Validators.required],
            addressRegion: ['', Validators.required],
            postalCode: ['', Validators.required],
            streetAddress: ['', Validators.required],
            locationName: ['', Validators.required]
        });
    }

    ngOnInit() {

    }

    public onSubmit() {
        this.formModal.dismiss(this.form.value, "submit");
    }

    public onCancel() {
        this.formModal.dismiss(undefined, "cancel");
    }

    public onDelete() {
        this.formModal.dismiss(this.form.value, "delete");
    }

}
