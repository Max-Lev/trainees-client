import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IFilterState, FilterActionState } from './search-filter/filter.action';
import { FilterReducer } from './search-filter/filter.reducer';
import { IEditState } from './edit/edit.actions';
import { EditReducer } from './edit/edit.reducer';
import { IAddState } from './add/add.actions';
import { AddReducer } from './add/add.reducer';

export interface AppState {
  filterState: IFilterState;
  editState: IEditState;
  addState:IAddState;
};

export const reducers: ActionReducerMap<any> = {
  filterReducer: FilterReducer,
  editReducer: EditReducer,
  addReducer: AddReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
