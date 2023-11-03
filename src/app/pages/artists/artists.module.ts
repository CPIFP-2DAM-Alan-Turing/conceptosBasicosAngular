import { NgModule } from '@angular/core';

import { ArtistsPageRoutingModule } from './artists-routing.module';

import { ArtistsPage } from './artists.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        ArtistsPageRoutingModule
    ],
    declarations: [ArtistsPage]
})
export class ArtistsPageModule { }
