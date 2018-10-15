import { Action } from '@ngrx/store';
import { AddInitialState, AddActionsList, IAddState } from './add.actions';

export function AddReducer(state = new AddInitialState(), action: IAddState) {
    switch (action.type) {

        case AddActionsList.ADD_ACTIVE_ACTION:
            const active = {
                ...state,
                ...action,
                payload: { ...action.payload }
            };
            return active;

        case AddActionsList.ADD_SAVE_ACTION:
            const save = {
                ...state,
                ...action,
                payload: { ...action.payload }
            };
            return save;

        default:
            return state;
    };


}