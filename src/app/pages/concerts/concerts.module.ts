import { NgModule } from '@angular/core';
import { ConcertsPageRoutingModule } from './concerts-routing.module';
import { ConcertsPage } from './concerts.page';
import { ConcertInfoComponent } from './components/concert-info/concert-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConcertFormComponent } from './components/concert-form/concert-form.component';

@NgModule({
    imports: [
        SharedModule,
        ConcertsPageRoutingModule,
    ],
    declarations: [
        ConcertsPage,
        ConcertInfoComponent,
        ConcertFormComponent
    ]
})
export class ConcertsPageModule { }
