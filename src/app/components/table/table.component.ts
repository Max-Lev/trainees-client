import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnChanges, SimpleChanges, Input, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatTableDataSource, } from '@angular/material';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store, select } from '@ngrx/store';
import { FilterActionState, FilterActionList } from 'src/app/reducers/search-filter/filter.action';
import { AppState } from 'src/app/reducers';
import { UtilService } from 'src/app/views/data-container/services/util.service';
import { AddEditState, AddEditActions, IAddEditState } from 'src/app/reducers/add-edit/add-edit.actions';
import { TraineeModelEmitter } from '../trainee-details/trainee-details.component';
import { ITableState } from 'src/app/views/data-container/data-container.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  displayedColumns: string[] = ['Id', 'Name', 'Date', 'Grade', 'Subject'];

  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  @Input() tableState?: ITableState;

  traineeDetails: TraineesModel;

  traineeSelectedID: number = -1;

  addEditState: IAddEditState;

  constructor(private store: Store<AppState>, private ref: ChangeDetectorRef, private utilService: UtilService) {

  };

  ngOnInit() {
  };

  ngAfterViewInit(): void {
    this.tableSortState$();
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.setState();
  };

  setState() {
    this.dataSource = new MatTableDataSource(this.tableState.traineesDataSource);
    this.dataSource.sort = this.sort;
    if (this.tableState.filterValue !== undefined && !'') {
      this.dataSource = this.utilService.filterById(this.tableState.filterValue, this.tableState.traineesDataSource);
    }
  };

  searchFilterHandler(searchFilterHandler: string) {
    this.dataSource = this.utilService.filterById(searchFilterHandler, this.tableState.traineesDataSource);
    this.searchFilterActionHandler(searchFilterHandler);
  };

  searchFilterActionHandler(filterValue: string) {
    this.store.dispatch(new FilterActionState(FilterActionList.SEARCH_FILTER_ACTIVE,
      { traineesDataSource: this.tableState.traineesDataSource, filterValue: filterValue }));
  };

  editTraineeDetails(trainee: TraineesModel, id: number) {
    if (this.traineeSelectedID !== id) {
      this.traineeSelectedID = id;
      this.traineeDetails = new TraineesModel(trainee);
    } else {
      this.traineeSelectedID = -1;
    }
  };

  addTrainee(){

  };

  tableSortState$() {
    this.sort.sortChange.subscribe((state) => {
      console.log(state)
    });
  };

}
