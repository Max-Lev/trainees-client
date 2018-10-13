import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnChanges, SimpleChanges, Input, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatTableDataSource, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store, select, State } from '@ngrx/store';
import { IFilterState, FilterActionState, FilterActionList } from 'src/app/reducers/actions/filter.action';
import { AppState } from 'src/app/reducers';
import { UtilService } from 'src/app/views/data-container/services/util.service';
import { NgModel } from '@angular/forms';

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

    console.log(this.tableState)
    this.filterValue = this.tableState.filterValue;
    this.traineesDataSource = this.tableState.traineesDataSource;
    if (this.tableState.filterValue === undefined || '') {
      this.dataSource = new MatTableDataSource(this.traineesDataSource);
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource(this.traineesDataSource);
      this.dataSource.sort = this.sort;
      this.dataSource = this.utilService.filterById(this.filterValue, this.traineesDataSource);
    }

    // this.dataSource = this.utilService.filterById(this.filterValue, this.traineesDataSource);
    // this.ref.detectChanges();
  };

  applyFilter(filterValue: string) {
    this.dataSource = this.utilService.filterById(filterValue, this.traineesDataSource);
    this.searchFilterActionHandler(filterValue);
  };

  searchFilterActionHandler(filterValue: string) {
    this.store.dispatch(new FilterActionState(FilterActionList.SEARCH_FILTER_ACTIVE, {
      traineesDataSource: this.traineesDataSource,
      filterValue: filterValue
    }));
  };

  tableSortState$() {
    this.sort.sortChange.subscribe((state) => {
      console.log(state)
    });
  };

}
