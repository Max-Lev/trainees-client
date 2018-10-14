import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FilterActionState, FilterActionList } from 'src/app/reducers/search-filter/filter.action';
import { EditState } from 'src/app/reducers/edit/edit.actions';
import { AddState, AddActionsList } from 'src/app/reducers/add/add.actions';

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
    this.searchFilterState$();
    this.editState$();
    this.addState$();
  };

  ngOnInit() {
    this.getTraineesApiAction();
  };

  ngAfterViewInit(): void {

  };

  addState$() {

    this.store.pipe(select('addReducer')).subscribe((state: AddState) => {

      if (state.type === AddActionsList.ADD_SAVE) {

        this.apiService.saveTrainee(state.payload).subscribe((data: TraineesModel[]) => {

          this.traineesDataSource = data;

          this.tableState = Object.assign({}, this.tableState, { traineesDataSource: this.traineesDataSource, filterValue: this.filterValue });

          this.ref.detectChanges();

        });
      }
    });
  };

  searchFilterState$() {
    this.store.pipe(select('filterReducer')).subscribe((state: FilterActionState) => {

      this.traineesDataSource = state.payload['traineesDataSource'];

      this.filterValue = state.payload['filterValue'];

      this.tableState = <ITableState>new Object({ traineesDataSource: state.payload['traineesDataSource'], filterValue: state.payload['filterValue'] });

      this.ref.markForCheck();
    });
  };

  editState$() {
    this.store.pipe(select('editReducer')).subscribe((state: EditState) => {

      // console.log('editReducer: ', state);

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

    });
  };



}
