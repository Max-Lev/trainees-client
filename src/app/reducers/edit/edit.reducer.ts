import { Action } from '@ngrx/store';
import { EditActionsList, EditInitialState, IEditState } from './edit.actions';

export function EditReducer(state = new EditInitialState(), action: IEditState) {
    switch (action.type) {
        case EditActionsList.EDIT_ACTIVE:
            const edit = {
                ...state,
                ...action,
                payload: action.payload,
                value: action.value,
                prop: action.prop
            };
            return edit;
        default:
            return state;
    }
};