import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssignmentsPageRoutingModule } from './assignments-routing.module';
import { AssignmentsPage } from './assignments.page';
import { AssignmentItemComponent } from './assignment-item/assignment-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        AssignmentsPageRoutingModule
    ],
    declarations: [
        AssignmentsPage,
        AssignmentItemComponent
    ]
})
export class AssignmentsPageModule { }
