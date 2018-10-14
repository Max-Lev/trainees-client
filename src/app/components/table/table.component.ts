import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnChanges, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, } from '@angular/material';
import { TraineesModel, ITrainees } from 'src/app/models/trainees.model';
import { Store, select } from '@ngrx/store';
import { FilterActionState, FilterActionList } from 'src/app/reducers/search-filter/filter.action';
import { AppState } from 'src/app/reducers';
import { UtilService } from 'src/app/views/data-container/services/util.service';
import { IEditState } from 'src/app/reducers/edit/edit.actions';
import { ITableDataContainer } from 'src/app/views/data-container/data-container.component';
import { AddState, AddActionsList } from 'src/app/reducers/add/add.actions';
import { ApiService } from 'src/app/views/data-container/services/api/api.service';

export const modeOptions = {
  editState: 'editState', 
  addState: 'addState',
  closed: 'closed', 
  saveMode: { isSave: false }
};

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

  @Input() tableDataContainer?: ITableDataContainer;

  traineeDetails: TraineesModel;

  editOpenIndex: number = -1;

  addItemCounter: number = -1;

  mode: any = { state: modeOptions.closed, saveMode: { isSave: false } };

  constructor(private store: Store<AppState>, private apiService: ApiService, private ref: ChangeDetectorRef, private utilService: UtilService) { };

  ngOnInit() { };

  ngAfterViewInit(): void {
    this.tableSortState$();
  };

  ngOnChanges(): void {
    this.setTableState();
  };

  setTableState() {
    this.dataSource = new MatTableDataSource(this.tableDataContainer.traineesDataSource);
    this.dataSource.sort = this.sort;
    if (this.tableDataContainer.filterValue !== undefined && !'') {
      this.dataSource = this.utilService.filterById(this.tableDataContainer.filterValue, this.tableDataContainer.traineesDataSource);
    }
  };

  //action dispatch
  searchKeyUp(value: string) {
    this.dataSource = this.utilService.filterById(value, this.tableDataContainer.traineesDataSource);
    this.store.dispatch(new FilterActionState(FilterActionList.SEARCH_FILTER_ACTIVE, { traineesDataSource: this.tableDataContainer.traineesDataSource, filterValue: value }));
  };

  //edit handler
  editTraineeDetails(trainee: TraineesModel, selecteRowIndex: number) {

    if (this.editOpenIndex !== selecteRowIndex) {
      this.editOpenIndex = selecteRowIndex;
      this.traineeDetails = new TraineesModel(trainee);
      this.mode = Object.assign({}, this.mode, { state: modeOptions.editState, saveMode: { isSave: false } });
    } else {
      this.editOpenIndex = -1;
      this.mode = Object.assign({}, this.mode, { state: modeOptions.closed, saveMode: { isSave: false } });
    }

  };

  addTrainee() {
    //reset mode
    if (!this.mode.saveMode.isSave) {
      this.apiService.getID().subscribe((response: any) => {

        this.mode = Object.assign({}, this.mode, { state: modeOptions.addState, saveMode: { isSave: true } });
        this.addItemCounter = response.id;

        const tempTrainee: TraineesModel = <TraineesModel>new Object({ id: response.id });
        this.traineeDetails = new TraineesModel(tempTrainee);

        this.ref.markForCheck();
      });
    }
    //save mode
    else if (this.mode.saveMode.isSave) {

      this.store.dispatch(new AddState(AddActionsList.ADD_SAVE, this.traineeDetails));
      const tempTrainee: TraineesModel = <TraineesModel>new Object({ id: ++this.addItemCounter });
      this.traineeDetails = new TraineesModel(tempTrainee);

      this.ref.markForCheck();
    }
  };

  tableSortState$() {
    this.sort.sortChange.subscribe((state) => {
      console.log(state)
    });
  };

}
