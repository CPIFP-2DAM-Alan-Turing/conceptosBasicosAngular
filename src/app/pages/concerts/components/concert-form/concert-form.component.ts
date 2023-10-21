import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      this.form.controls['description'].setValue(_concert.description);
      this.form.controls['locationType'].setValue(_concert.location.type);
      this.form.controls['locationAddressType'].setValue(_concert.location.address.type);
      this.form.controls['addressCountry'].setValue(_concert.location.address.addressCountry);
      this.form.controls['addressLocality'].setValue(_concert.location.address.addressLocality);
      this.form.controls['addressRegion'].setValue(_concert.location.address.addressRegion);
      this.form.controls['postalCode'].setValue(_concert.location.address.postalCode);
      this.form.controls['streetAddress'].setValue(_concert.location.address.streetAddress);
      this.form.controls['locationName'].setValue(_concert.location.name);
      this.form.controls['name'].setValue(_concert.name);
    }
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [null],
      description: [''],
      locationType: [''],
      locationAddressType: [''],
      addressCountry: [''],
      addressLocality: [''],
      addressRegion: [''],
      postalCode: [''],
      streetAddress: [''],
      locationName: [''],
      name: [''],
    });
  }

  ngOnInit() {

  }

}
