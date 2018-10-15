import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnChanges, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, } from '@angular/material';
import { TraineesModel } from 'src/app/models/trainees.model';
import { Store, select } from '@ngrx/store';
import { FilterActionState, FilterActionList } from 'src/app/reducers/search-filter/filter.action';
import { AppState } from 'src/app/reducers';
import { UtilService } from 'src/app/views/data-container/services/util.service';
import { ITableDataContainer } from 'src/app/views/data-container/data-container.component';
import { ApiService } from 'src/app/views/data-container/services/api/api.service';
import { RemoveState, RemoveActionsList } from 'src/app/reducers/remove/remove.actions';
import { IModeState, ModeState, SAVEMODEACTIONTYPES, PanelModeState, PANELDETAILSACTIONTYPES, SaveModeState, REMOVEMODEACTIONTYPES, RemoveModeState } from 'src/app/reducers/mode/mode-reducer.actions';

export const modeOptions = {
  editState: PANELDETAILSACTIONTYPES.PANEL_DETAILS_EDIT,
  addState: PANELDETAILSACTIONTYPES.PANEL_DETAILS_SAVE,
  closed: PANELDETAILSACTIONTYPES.PANEL_DETAILS_CLOSED,
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

  activeTraineeModel: TraineesModel;

  editOpenIndex: number = -1;

  addItemCounter: number = -1;

  mode: any = { state: modeOptions.closed, saveMode: { isSave: false }, disabled: true };

  constructor(private store: Store<AppState>, private apiService: ApiService, private ref: ChangeDetectorRef, private utilService: UtilService) {

    this.store.pipe(select('modeReducer')).subscribe((state: IModeState) => {

      this.mode = Object.assign({}, this.mode, {
        state: state.panelState.type,
        disabled: state.removeState.payload.disabled,
        saveMode: { isSave: state.saveState.payload.isSave }
      });

      if (state.saveState.type === SAVEMODEACTIONTYPES.SAVE_TRUE || state.panelState.type === PANELDETAILSACTIONTYPES.PANEL_DETAILS_EDIT) {
        const trainee: TraineesModel = state.panelState.trainee;
        this.activeTraineeModel = new TraineesModel(trainee);
        this.addItemCounter = this.activeTraineeModel.id;
      }
      this.ref.markForCheck();
    });
  };

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
      this.activeTraineeModel = new TraineesModel(trainee);
      this.store.dispatch(new ModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_EDIT,
        new PanelModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_EDIT, trainee),
        new SaveModeState(SAVEMODEACTIONTYPES.SAVE_FALSE), new RemoveModeState(REMOVEMODEACTIONTYPES.REMOVE_ACTIVE)
      ));
    } else {
      this.editOpenIndex = -1;
      this.store.dispatch(new ModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_CLOSED, new
        PanelModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_CLOSED, this.activeTraineeModel),
        new SaveModeState(SAVEMODEACTIONTYPES.SAVE_FALSE), new RemoveModeState(REMOVEMODEACTIONTYPES.REMOVE_DISABLED)
      ));
    }
  };

  removeTrainee() {
    this.store.dispatch(new RemoveState(RemoveActionsList.REMOVE_ACTIVE, this.activeTraineeModel));
    this.store.dispatch(new ModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_CLOSED, new
      PanelModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_CLOSED, this.activeTraineeModel),
      new SaveModeState(SAVEMODEACTIONTYPES.SAVE_FALSE), new RemoveModeState(REMOVEMODEACTIONTYPES.REMOVE_DISABLED)
    ));
  };

  @Output() save: EventEmitter<any> = new EventEmitter();
  addTrainee() {
    //reset mode
    if (!this.mode.saveMode.isSave) {
      this.apiService.getID().subscribe((response: any) => {

        this.addItemCounter = response.id;
        const tempTrainee: TraineesModel = <TraineesModel>new Object({ id: response.id });
        this.activeTraineeModel = new TraineesModel(tempTrainee);
        this.store.dispatch(new ModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_SAVE,
          new PanelModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_SAVE, this.activeTraineeModel),
          new SaveModeState(SAVEMODEACTIONTYPES.SAVE_TRUE),
          new RemoveModeState(REMOVEMODEACTIONTYPES.REMOVE_DISABLED)
        ));
        this.ref.markForCheck();
      });
    }
    //save mode
    else if (this.mode.saveMode.isSave) {

      if (this.activeTraineeModel.name !== '' && this.activeTraineeModel.name !== undefined) {

        this.save.emit({ mode: 'Save', payload: this.activeTraineeModel });

        const tempTrainee: TraineesModel = <TraineesModel>new Object({ id: ++this.addItemCounter });
        this.activeTraineeModel = new TraineesModel(tempTrainee);
        this.store.dispatch(new ModeState(SAVEMODEACTIONTYPES.SAVE_TRUE,
          new PanelModeState(PANELDETAILSACTIONTYPES.PANEL_DETAILS_SAVE, this.activeTraineeModel), new SaveModeState(SAVEMODEACTIONTYPES.SAVE_TRUE),
          new RemoveModeState(REMOVEMODEACTIONTYPES.REMOVE_DISABLED)));
        this.ref.markForCheck();
      }
    }
  };

  tableSortState$() {
    this.sort.sortChange.subscribe((state) => { });
  };

}
