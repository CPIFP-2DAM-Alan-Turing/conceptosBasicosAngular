import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonEffectDirective } from './directives/button-effect.directive';

@NgModule({
  declarations: [
    // Directives
    ButtonEffectDirective,
  ],
  imports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    // Directives
    ButtonEffectDirective,
  ]
})
export class SharedModule { }
