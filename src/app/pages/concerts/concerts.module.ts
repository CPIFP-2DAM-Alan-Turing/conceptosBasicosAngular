import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ConcertsPageRoutingModule } from './concerts-routing.module';

import { ConcertsPage } from './concerts.page';
import { ConcertInfoComponent } from './components/concert-info/concert-info.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ConcertsPageRoutingModule,
        SharedModule
    ],
    declarations: [ConcertsPage, ConcertInfoComponent]
})
export class ConcertsPageModule { }
