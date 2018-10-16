import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { EditState, EditActionsList } from 'src/app/reducers/edit/edit.actions';
import { AddActionsList, AddState } from 'src/app/reducers/add/add.actions';
import { modeOptions } from '../table/table.component';

export interface TraineeModelEmitter {
  activeTraineeModel: TraineesModel;
  value: string;
  prop: string;
}

@Component({
  selector: 'app-trainee-details',
  templateUrl: './trainee-details.component.html',
  styleUrls: ['./trainee-details.component.scss']
})
export class TraineeDetailsComponent implements OnInit, OnChanges {

  @Input() activeTraineeModel: TraineesModel;

  @Input() mode: any;

  viewObj: any = { k: [], v: [] };

  constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

  ngOnInit() { };

  ngOnChanges(): void {
    this.viewItemFormatter();
  };

  viewItemFormatter() {
    if (this.activeTraineeModel !== undefined || null) {
      this.viewObj = { k: [], v: [] };
      const propsList: string[] = Object.keys(this.activeTraineeModel);
      propsList.filter((prop) => { this.viewObj.k.push(prop); });
      this.ref.detectChanges();
    }
  };

  onChange(traineeModelChange: TraineesModel, value: string, prop: string) {

    if (this.mode.state === modeOptions.editState) {
      this.store.dispatch(new EditState(EditActionsList.EDIT_ACTIVE, traineeModelChange, value, prop));
    }
    else if (this.mode.state === modeOptions.addState) {
      this.store.dispatch(new AddState(AddActionsList.ADD_ACTIVE_ACTION, traineeModelChange));
    }

  };

}
