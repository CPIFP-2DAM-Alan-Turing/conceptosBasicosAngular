import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ButtonEffectDirective } from 'src/app/shared/directives/button-effect.directive';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
