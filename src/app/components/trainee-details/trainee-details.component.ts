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

  detailsView: any = { k: [], v: [] };

  constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

  ngOnInit() {

  };

  ngOnChanges(): void {

    this.detailsView = { k: [], v: [] };
    const k: string[] = Object.keys(this.traineeDetails);
    k.filter((prop) => {
      this.detailsView.k.push(prop);
      this.detailsView.v.push(this.traineeDetails[prop]);
    });

  };

  onChange(traineeDetails: TraineesModel, value: string, prop: string) {
    console.log('change')
    this.store.dispatch(new AddEditState(AddEditActions.EDIT_ACTIVE, true, false, traineeDetails, value, prop));
  }

}
