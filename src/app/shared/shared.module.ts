import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonEffectDirective } from './directives/button-effect.directive';
import { ArtistSelectableComponent } from './components/artist-selectable/artist-selectable.component';

@NgModule({
  declarations: [
    // Directives
    ButtonEffectDirective,
    // Components
    ArtistSelectableComponent
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
    ArtistSelectableComponent
  ]
})
export class SharedModule { }
