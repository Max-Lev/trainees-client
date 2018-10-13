import { Action } from '@ngrx/store';
import { FilterActionList, IFilterState, FilterInitialState, FilterActionState } from './filter.action';

export function FilterReducer(state = new FilterInitialState(), action: Action) {

    switch (action.type) {
        case FilterActionList.SEARCH_FILTER_ACTIVE:
            const active = {
                ...state,
                ...action,
                payload: action['payload']
            };
            return active;
        case FilterActionList.SEARCH_FILTER_DATA:
            const data = {
                ...state,
                ...action,
                payload: action['payload']
            };
            return data;
        default:
            return state;
    }
};