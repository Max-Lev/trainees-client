import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FilterActionState, FilterActionList } from 'src/app/reducers/search-filter/filter.action';
import { EditState } from 'src/app/reducers/edit/edit.actions';
import { AddState, AddActionsList } from 'src/app/reducers/add/add.actions';
import { IRemoveState, RemoveActionsList, RemoveInitialState, RemoveState } from 'src/app/reducers/remove/remove.actions';

export interface ITableDataContainer {
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

  tableDataContainer: ITableDataContainer = <ITableDataContainer>new Object({ traineesDataSource: [], filterValue: '' });

  constructor(private store: Store<AppState>, private apiService: ApiService, private ref: ChangeDetectorRef) {
    this.searchFilterState$();
    this.editState$();
    // this.addState$();
    this.removeState$();

    this.store.pipe(select('addReducer')).subscribe((state: AddState) => {
      console.log('addState: ', state);
    });
  };

  ngOnInit() {
    this.getTraineesApiAction();
  };

  ngAfterViewInit(): void {

  };

  removeState$() {
    this.store.pipe(select('removeReducer')).subscribe((state: IRemoveState) => {

      if (state.type === RemoveActionsList.REMOVE_ACTIVE) {

        this.apiService.deleteTrainee(state.payload).subscribe((data: TraineesModel[]) => {

          this.traineesDataSource = data;

          this.tableDataContainer = Object.assign({}, this.tableDataContainer, { traineesDataSource: this.traineesDataSource, filterValue: this.filterValue });

          this.store.dispatch(new RemoveState(RemoveActionsList.REMOVE_INIT, null));

          this.ref.markForCheck();
        });
      };
    });
  };

  saveHandler(state: any) {

    if (state.mode === 'Save') {
      this.apiService.saveTrainee(state.payload).subscribe((data: TraineesModel[]) => {
        this.traineesDataSource = data;
        this.tableDataContainer = Object.assign({}, this.tableDataContainer, { traineesDataSource: this.traineesDataSource, filterValue: this.filterValue });
        this.ref.markForCheck();
      });
    }
  }

  // grid data binding
  editState$() {
    this.store.pipe(select('editReducer')).subscribe((state: EditState) => {

      const dataSource: TraineesModel[] = this.tableDataContainer.traineesDataSource.map((item) => {

        if (item.id === state.payload.id) {
          item = Object.assign({}, item, { [state.prop]: state.value });
          return item;
        }
        else {
          return item;
        }
      });
      this.tableDataContainer = <ITableDataContainer>new Object({ traineesDataSource: dataSource, filterValue: this.filterValue });
    });
  };

  // search
  searchFilterState$() {
    this.store.pipe(select('filterReducer')).subscribe((state: FilterActionState) => {

      this.traineesDataSource = state.payload['traineesDataSource'];

      this.filterValue = state.payload['filterValue'];

      this.tableDataContainer = <ITableDataContainer>new Object({ traineesDataSource: state.payload['traineesDataSource'], filterValue: state.payload['filterValue'] });

      this.ref.markForCheck();
    });
  };


  getTraineesApiAction() {

    this.apiService.getTrainees().subscribe((trainees: TraineesModel[]) => {

      this.traineesDataSource = [...trainees.map(trainee => Object.assign({}, trainee))];

      this.tableDataContainer = Object.assign({}, this.tableDataContainer, { traineesDataSource: this.traineesDataSource, filterValue: this.filterValue });

      this.store.dispatch(new FilterActionState(FilterActionList.SEARCH_FILTER_DATA, this.tableDataContainer));

    });
  };



}
