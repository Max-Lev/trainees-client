import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FilterActionState } from 'src/app/reducers/actions/filter.action';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss']
})
export class DataContainerComponent implements OnInit, AfterViewInit {

  traineesDataSource: TraineesModel[] = [];

  filterValue: string;

  tableState = {
    traineesDataSource: [],
    filterValue: ''
  };

  constructor(private store: Store<AppState>, private apiService: ApiService) {

    this.store.pipe(select('filterReducer')).subscribe((state: FilterActionState) => {
      this.filterValue = state.payload.filterValue;
      this.tableState = Object.assign({}, this.tableState, {
        traineesDataSource: this.traineesDataSource,
        filterValue: this.filterValue
      });
    });

  };

  ngOnInit() {
    this.getTraineesApiAction();
  };

  ngAfterViewInit(): void {

  };

  getTraineesApiAction() {
    this.apiService.getTrainees().subscribe((trainees: TraineesModel[]) => {
      this.traineesDataSource = trainees.map(trainee => Object.assign({}, trainee));

      this.tableState = Object.assign({}, this.tableState, {
        traineesDataSource: this.traineesDataSource,
        filterValue: this.filterValue
      });

    });
  };


}
