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
import { IAddEditState } from './add-edit/add-edit.actions';
import { AddEditReducer } from './add-edit/add-edit.reducer';

export interface AppState {
  filterState: IFilterState;
  addEditState:IAddEditState;
};

export const reducers: ActionReducerMap<any> = {
  filterReducer: FilterReducer,
  addEditReducer:AddEditReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
