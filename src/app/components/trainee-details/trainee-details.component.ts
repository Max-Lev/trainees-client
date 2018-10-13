import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AddEditState, AddEditActions } from 'src/app/reducers/add-edit/add-edit.actions';

export interface TraineeModelEmitter {
  traineeDetails: TraineesModel;
  value: string;
  prop: string;
}

@Component({
  selector: 'app-trainee-details',
  templateUrl: './trainee-details.component.html',
  styleUrls: ['./trainee-details.component.scss']
})
export class TraineeDetailsComponent implements OnInit, OnChanges {

  @Input() traineeDetails: TraineesModel;

  // @Output() change: EventEmitter<TraineeModelEmitter> = new EventEmitter();

  constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

  ngOnInit() {

  };

  ngOnChanges(): void {

  };

  edit(trainee: TraineesModel, prop: string) {
    console.log('edit state active: ', trainee, prop)
    // this.ref.markForCheck();
    // this.ref.detectChanges();
    // this.store.dispatch(new AddEditState(AddEditActions.EDIT_ACTIVE, true, false));
  }

  onChange(traineeDetails: TraineesModel, value: string, prop: string) {
    console.log('change')
    this.store.dispatch(new AddEditState(AddEditActions.EDIT_ACTIVE, true, false, traineeDetails, value, prop));
    // debugger;
    // const data: TraineeModelEmitter = { traineeDetails: traineeDetails, value: value, prop: prop };
    // this.change.emit(data);
  }

}
