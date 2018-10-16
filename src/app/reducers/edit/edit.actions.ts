import { TraineesModel } from 'src/app/models/trainees.model';
import { Action } from '@ngrx/store';

export const EDIT_ACTIVE: string = '[EDIT_ACTION] EDIT_ACTIVE';
export const EDIT_DISABLED: string = '[EDIT_ACTION] EDIT_DISABLED';

export interface IEditState {
    type: string;
    payload?: TraineesModel;
    value?: string;
    prop?: string;
}

export class EditInitialState implements IEditState {
    type: string;
    payload: any = [];
    constructor() {

    };
}
export class EditState implements IEditState {
    type: string;
    payload: TraineesModel;
    value: string;
    prop: string;
    constructor(type: string, payload: TraineesModel, value: string, prop: string) {
        this.type = type;
        this.payload = payload;
        this.value = value;
        this.prop = prop;
    };
}

export const EditActionsList = { EDIT_ACTIVE, EDIT_DISABLED, };