import { AssignmentItemComponent } from './components/assignment-item/assignment-item.component';
import { AssignmentsPage } from './assignments.page';
import { AssignmentsPageRoutingModule } from './assignments-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignmentFormComponent } from './components/assignment-form/assignment-form.component';

@NgModule({
    imports: [
        AssignmentsPageRoutingModule,
        SharedModule,
    ],
    declarations: [
        AssignmentFormComponent,
        AssignmentItemComponent,
        AssignmentsPage,
    ]
})
export class AssignmentsPageModule { }
