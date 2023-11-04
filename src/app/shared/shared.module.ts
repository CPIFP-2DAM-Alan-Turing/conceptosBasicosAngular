import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonEffectDirective } from './directives/button-effect.directive';
import { ArtistSelectableComponent } from './components/artist-selectable/artist-selectable.component';
import { ArtistItemComponent } from './components/artist-item/artist-item.component';
import { ConcertSelectableComponent } from './components/concert-selectable/concert-selectable.component';
import { ConcertSelectableItemComponent } from './components/concert-selectable/concert-selectable-item/concert-selectable-item.component';

@NgModule({
  declarations: [
    // Directives
    ButtonEffectDirective,
    // Components
    ArtistSelectableComponent,
    ArtistItemComponent,
    ConcertSelectableComponent,
    ConcertSelectableItemComponent
  ],
  imports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    // Directives
    ButtonEffectDirective,
    // Components
    ArtistSelectableComponent,
    ArtistItemComponent,
    ConcertSelectableComponent,
    ConcertSelectableItemComponent
  ]
})
export class SharedModule { }
