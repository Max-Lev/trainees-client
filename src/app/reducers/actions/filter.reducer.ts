import { Action } from '@ngrx/store';
import { FilterActionList, IFilterState, FilterInitialState, FilterActionState } from './filter.action';

export function FilterReducer(state = new FilterActionState(), action: Action) {

    switch (action.type) {
        case FilterActionList.SEARCH_FILTER_ACTIVE:
            const active = {
                ...state,
                ...action
            };
            console.log('active: ', active);
            return active;
        default:
            return state = new FilterInitialState();
    }
};