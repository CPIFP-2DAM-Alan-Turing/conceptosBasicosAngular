import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonEffectDirective } from './directives/button-effect.directive';
import { ConcertSelectableComponent } from './components/concert-selectable/concert-selectable.component';
import { ConcertSelectableItemComponent } from './components/concert-selectable/concert-selectable-item/concert-selectable-item.component';
import { ImageSelectableComponent } from '../pages/concerts/components/concert-form/image-selectable/image-selectable/image-selectable.component';
import { ArtistSelectableComponent } from './components/artist-selectable/artist-selectable.component';
import { ArtistItemComponent } from './components/artist-selectable/artist-item/artist-item.component';
import { AssignmentPipe } from './pipes/assignment.pipe';

@NgModule({
  declarations: [
    // Directives
    ButtonEffectDirective,
    // Components
    ArtistSelectableComponent,
    ArtistItemComponent,
    ConcertSelectableComponent,
    ConcertSelectableItemComponent,
    ImageSelectableComponent,
    // Pipes
    AssignmentPipe
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
    ConcertSelectableItemComponent,
    ImageSelectableComponent,
    // Pipes
    AssignmentPipe
  ]
})
export class SharedModule { }
