export const ADD_ACTIVE: string = '[ADD_ACTION] ADD_ACTIVE';
export const ADD_DISABLED: string = '[ADD_ACTION] ADD_DISABLED';
export const ADD_SAVE: string = '[ADD_ACTION] ADD_SAVE';

export interface IAddState {
    type: string;
    payload?: any;
}

export class AddInitialState implements IAddState {
    type: string = ADD_DISABLED;
    payload?: any = {};
    constructor() {

    }
}
export class AddState implements IAddState {
    type: string;
    payload?: any;
    constructor(type: string, payload?: any) {
        this.type = type;
        this.payload = payload;
    }
}


export const AddActionsList = {
    ADD_ACTIVE, ADD_DISABLED, ADD_SAVE
};