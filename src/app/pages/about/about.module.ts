import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';
import { AboutUsCardComponent } from './components/about-us-card/about-us-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AboutPageRoutingModule,
],
declarations: [
    AboutPage,
    AboutUsCardComponent,
  ]
})
export class AboutPageModule {}
