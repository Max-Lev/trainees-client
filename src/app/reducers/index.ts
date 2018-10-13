import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IFilterState, FilterActionState } from './actions/filter.action';
import { FilterReducer } from './actions/filter.reducer';

export interface AppState {
  filterState: FilterActionState;
};

export const reducers: ActionReducerMap<any> = {
  filterReducer: FilterReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
