import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from 'src/app/core/models/assignment.model';

@Component({
  selector: 'app-assignment-item',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.scss'],
})
export class AssignmentItemComponent implements OnInit {
  private _assignment: Assignment | null = null;
  @Input() public i = 0;

  @Input() set assignment(assignment: Assignment | null) {
    if (assignment) {
      this._assignment = assignment;
    }
  }

  get assignment(): Assignment | null {
    return this._assignment;
  }

  constructor() {
    console.debug("constructor assignment item component")
   }

  ngOnInit() { 
    console.debug("init assignment item component")
  }

}
