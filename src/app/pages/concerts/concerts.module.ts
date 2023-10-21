import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcertsPageRoutingModule } from './concerts-routing.module';

import { ConcertsPage } from './concerts.page';
import { ConcertInfoComponent } from './concert-info/concert-info.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConcertsPageRoutingModule,
    ],
    declarations: [ConcertsPage, ConcertInfoComponent]
})
export class ConcertsPageModule { }
