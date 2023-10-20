import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';
import { AboutUsCardComponent } from './components/about-us-card/about-us-card.component';

@NgModule({
  imports: [
    AboutPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    AboutPage,
    AboutUsCardComponent
  ]
})
export class AboutPageModule {}
