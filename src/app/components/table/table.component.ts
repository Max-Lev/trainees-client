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

  traineesDataSource: TraineesModel[] = [];

  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  filterValue: string;

  @Input() tableState: any;

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
    this.filterValue = this.tableState.filterValue;

    this.traineesDataSource = this.tableState.traineesDataSource;

    this.dataSource = new MatTableDataSource(this.traineesDataSource);

    this.dataSource.sort = this.sort;

    if (this.tableState.filterValue !== undefined && !'') {
      this.dataSource = this.utilService.filterById(this.filterValue, this.traineesDataSource);
    }
    console.log('tableState: ', this.tableState);
  };

  searchFilterHandler(searchFilterHandler: string) {
    this.dataSource = this.utilService.filterById(searchFilterHandler, this.traineesDataSource);
    this.searchFilterActionHandler(searchFilterHandler);
  };

  searchFilterActionHandler(filterValue: string) {
    this.store.dispatch(new FilterActionState(FilterActionList.SEARCH_FILTER_ACTIVE, {
      traineesDataSource: this.traineesDataSource,
      filterValue: filterValue
    }));
  };

  editTraineeDetails(trainee: TraineesModel) {
    debugger;
  }

  tableSortState$() {
    this.sort.sortChange.subscribe((state) => {
      console.log(state)
    });
  };

}
