import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnChanges, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, } from '@angular/material';
import { TraineesModel, ITrainees } from 'src/app/models/trainees.model';
import { Store } from '@ngrx/store';
import { FilterActionState, FilterActionList } from 'src/app/reducers/search-filter/filter.action';
import { AppState } from 'src/app/reducers';
import { UtilService } from 'src/app/views/data-container/services/util.service';
import { IEditState } from 'src/app/reducers/edit/edit.actions';
import { ITableState } from 'src/app/views/data-container/data-container.component';
import { AddState, AddActionsList } from 'src/app/reducers/add/add.actions';
import { ApiService } from 'src/app/views/data-container/services/api/api.service';



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

  editState: boolean = false;

  addEditState: IEditState;

  // @Output() saveEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: Store<AppState>, private apiService: ApiService, private ref: ChangeDetectorRef, private utilService: UtilService) { };

  ngOnInit() { };

  ngAfterViewInit(): void {
    this.tableSortState$();
  };

  ngOnChanges(): void {
    this.setTableState();
  };

  setTableState() {
    this.dataSource = new MatTableDataSource(this.tableState.traineesDataSource);
    this.dataSource.sort = this.sort;
    if (this.tableState.filterValue !== undefined && !'') {
      this.dataSource = this.utilService.filterById(this.tableState.filterValue, this.tableState.traineesDataSource);
    }
  };

  //action dispatch
  searchFilterHandler(searchFilterHandler: string) {
    this.dataSource = this.utilService.filterById(searchFilterHandler, this.tableState.traineesDataSource);
    this.searchFilterActionHandler(searchFilterHandler);
  };

  searchFilterActionHandler(filterValue: string) {
    this.store.dispatch(new FilterActionState(FilterActionList.SEARCH_FILTER_ACTIVE, { traineesDataSource: this.tableState.traineesDataSource, filterValue: filterValue }));
  };

  //edit handler
  editTraineeDetails(trainee: TraineesModel, index: number) {

    if (this.traineeSelectedID !== index) {
      this.traineeSelectedID = index;
      this.editState = true;
      this.addState = false;
      this.traineeDetails = new TraineesModel(trainee);
    } else {
      this.editState = false;
      this.addState = false;
      this.traineeSelectedID = -1;
    }
    this.isSave = false;
  };

  addState: boolean = false;
  isSave: boolean = false;
  id: number = -1;
  mode: string = undefined;
  addTrainee() {

    if (!this.isSave) {
      this.apiService.getID().subscribe((response: any) => {
        this.id = response.id;
        this.addState = true;
        this.editState = false;
        const tempTrainee: TraineesModel = <TraineesModel>new Object({ id: response.id });
        this.traineeDetails = new TraineesModel(tempTrainee);
        console.log('edit save', this.traineeDetails);
        this.isSave = true;
      });
    }
    if (this.isSave) {
      console.log('save', this.traineeDetails);
      this.store.dispatch(new AddState(AddActionsList.ADD_SAVE, this.traineeDetails));
      const tempTrainee: TraineesModel = <TraineesModel>new Object({ id: ++this.id });
      this.traineeDetails = new TraineesModel(tempTrainee);
    }
    this.ref.markForCheck();
  };

  tableSortState$() {
    this.sort.sortChange.subscribe((state) => {
      console.log(state)
    });
  };

}
