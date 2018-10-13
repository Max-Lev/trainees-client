import { TraineesModel } from 'src/app/models/trainees.model';
import { Action } from '@ngrx/store';

export const EDIT_ACTIVE: string = '[ADD_EDIT_ACTION] EDIT_ACTIVE';
export const EDIT_DISABLED: string = '[ADD_EDIT_ACTION] EDIT_DISABLED';
export const ADD_ACTIVE: string = '[ADD_EDIT_ACTION] ADD_ACTIVE';
export const ADD_DISABLED: string = '[ADD_EDIT_ACTION] ADD_DISABLED';

export interface IAddEditState {
    type: string;
    isEdit: boolean;
    isAdd: boolean;
    payload?: TraineesModel;
    value?: string;
    prop?: string;
}

export class AddEditInitialState implements IAddEditState {
    type: string;
    isEdit: boolean = false;
    isAdd: boolean = false;
    payload: any = [];
    constructor() {
        this.isEdit = false;
        this.isAdd = false;
    };
}
export class AddEditState implements IAddEditState {
    type: string;
    isEdit: boolean;
    isAdd: boolean;
    payload: TraineesModel;
    value: string;
    prop: string;
    constructor(type: string, isEdit: boolean, isAdd: boolean, payload: TraineesModel, value: string, prop: string) {
        this.type = type;
        this.isEdit = isEdit;
        this.isAdd = isAdd;
        this.payload = payload;
        this.value = value;
        this.prop = prop;
    };
}

export const AddEditActions = {
    EDIT_ACTIVE, EDIT_DISABLED, ADD_ACTIVE, ADD_DISABLED
};