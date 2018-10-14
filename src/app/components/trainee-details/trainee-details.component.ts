import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { EditState, EditActionsList } from 'src/app/reducers/edit/edit.actions';
import { AddActionsList, AddState } from 'src/app/reducers/add/add.actions';

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

  @Input() mode: string;

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
    this.ref.detectChanges();
  };


  onChange(traineeDetails: TraineesModel, value: string, prop: string) {
    if (this.mode !== "'addState'") {
      this.store.dispatch(new EditState(EditActionsList.EDIT_ACTIVE, traineeDetails, value, prop));
    }
    else {
      this.store.dispatch(new AddState(AddActionsList.ADD_ACTIVE, traineeDetails));
    }
  };

  // onChange(traineeDetails: TraineesModel, value: string, prop: string) {
  //   if (this.mode !== "'addState'") {
  //     this.store.dispatch(new EditState(EditActionsList.EDIT_ACTIVE, traineeDetails, value, prop));
  //     // console.log('edit action')
  //   } else {
  //     // console.log('save action', this.traineeDetails)
  //     // if (traineeDetails.name !== undefined && traineeDetails.name !== '') {
  //     this.store.dispatch(new AddState(AddActionsList.ADD_ACTIVE, { trainee: traineeDetails }));
  //     // debugger
  //     // }
  //   }
  // };

}
