import { Action } from '@ngrx/store';
import { AddInitialState, AddActionsList, IAddState } from './add.actions';

export function AddReducer(state = new AddInitialState(), action: IAddState) {
    switch (action.type) {

        case AddActionsList.ADD_ACTIVE:
            const active = {
                ...state,
                ...action,
                payload: { ...action.payload }
            };
            // console.log('add active: ', active);
            return active;

        case AddActionsList.ADD_SAVE:
            const save = {
                ...state,
                ...action,
                payload: { ...action.payload }
            };
            // console.log('add save: ', save);
            return save;

        default:
            // console.log('add initial: ', state)
            return state;
    };


}