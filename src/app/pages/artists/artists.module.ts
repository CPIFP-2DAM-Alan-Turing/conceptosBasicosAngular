import { NgModule } from '@angular/core';

import { ArtistsPageRoutingModule } from './artists-routing.module';

import { ArtistsPage } from './artists.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArtistInfoComponent } from './components/artist-info/artist-info.component';

@NgModule({
    imports: [
        // Modules
        SharedModule,
        ArtistsPageRoutingModule
    ],
    declarations: [
        // Components
        ArtistInfoComponent,
        // Pages
        ArtistsPage,
    ]
})
export class ArtistsPageModule { }
