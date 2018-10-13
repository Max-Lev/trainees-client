import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnChanges, SimpleChanges, Input, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatTableDataSource, } from '@angular/material';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store } from '@ngrx/store';
import { FilterActionState, FilterActionList } from 'src/app/reducers/actions/filter.action';
import { AppState } from 'src/app/reducers';
import { UtilService } from 'src/app/views/data-container/services/util.service';


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

  @Input() tableState: any;

  traineeDetails: TraineesModel;

  traineeSelectedID: number = -1;

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
    this.store.dispatch(new FilterActionState(FilterActionList.SEARCH_FILTER_ACTIVE, { traineesDataSource: this.tableState.traineesDataSource, filterValue: filterValue }));
  };

  editTraineeDetails(trainee: TraineesModel) {
    if (this.traineeSelectedID !== trainee.id) {
      this.traineeSelectedID = trainee.id;
      this.traineeDetails = new TraineesModel(trainee);
    } else {
      this.traineeSelectedID = -1;
    }
  }

  tableSortState$() {
    this.sort.sortChange.subscribe((state) => {
      console.log(state)
    });
  };

}
