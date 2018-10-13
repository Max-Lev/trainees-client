import { Action } from '@ngrx/store';
import { AddEditActions, AddEditInitialState, IAddEditState } from './add-edit.actions';

export function AddEditReducer(state = new AddEditInitialState(), action: IAddEditState) {
    switch (action.type) {
        case AddEditActions.EDIT_ACTIVE:

            const edit = {
                ...state,
                ...action,
                isEdit: true,
                isAdd: false,
                payload: action.payload,
                value: action.value,
                prop: action.prop
            };
            console.log('edit state: ', edit);
            return edit;
        case AddEditActions.ADD_ACTIVE:
            const add = {
                ...state,
                ...action,
                isEdit: true,
                isAdd: true
            };
            return add;
        default:
            return state;
    }
};