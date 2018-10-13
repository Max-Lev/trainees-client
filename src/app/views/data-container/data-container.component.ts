import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FilterActionState, FilterActionList } from 'src/app/reducers/search-filter/filter.action';
import { AddEditState } from 'src/app/reducers/add-edit/add-edit.actions';

export interface ITableState {
  traineesDataSource: TraineesModel[],
  filterValue: string
};

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataContainerComponent implements OnInit, AfterViewInit {

  traineesDataSource: TraineesModel[] = [];

  filterValue: string;

  tableState: ITableState = <ITableState>new Object({ traineesDataSource: [], filterValue: '' });

  constructor(private store: Store<AppState>, private apiService: ApiService, private ref: ChangeDetectorRef) {

    this.getSearchFilterState$();

  };

  ngOnInit() {
    this.getTraineesApiAction();
  };

  ngAfterViewInit(): void {
    this.getAddEditState$();
  };

  getSearchFilterState$() {
    this.store.pipe(select('filterReducer')).subscribe((state: FilterActionState) => {

      this.traineesDataSource = state.payload['traineesDataSource'];

      this.filterValue = state.payload['filterValue'];

      this.tableState = <ITableState>new Object({ traineesDataSource: state.payload['traineesDataSource'], filterValue: state.payload['filterValue'] });

      this.ref.markForCheck();
    });
  };

  getAddEditState$() {
    this.store.pipe(select('addEditReducer')).subscribe((state: AddEditState) => {

      console.log('addEditReducer: ', state);

      const dataSource: TraineesModel[] = this.tableState.traineesDataSource.map((item) => {

        if (item.id === state.payload.id) {

          item = Object.assign({}, item, { [state.prop]: state.value });

          return item;
        }
        else {
          return item;
        }
      });
      this.tableState = <ITableState>new Object({ traineesDataSource: dataSource, filterValue: this.filterValue });
    });
  };

  getTraineesApiAction() {
    this.apiService.getTrainees().subscribe((trainees: TraineesModel[]) => {

      this.traineesDataSource = [...trainees.map(trainee => Object.assign({}, trainee))];

      this.tableState = Object.assign({}, this.tableState, { traineesDataSource: this.traineesDataSource, filterValue: this.filterValue });

      this.store.dispatch(new FilterActionState(FilterActionList.SEARCH_FILTER_DATA, this.tableState));

      this.setTableState();
    });
  };

  setTableState() {
    this.tableState = Object.assign({}, this.tableState, { traineesDataSource: this.traineesDataSource, filterValue: this.filterValue });

    this.ref.detectChanges();
  };


}
