export const ADD_ACTIVE_ACTION: string = '[ADD_ACTION] ADD_ACTIVE_ACTION';
export const ADD_DISABLED_ACTION: string = '[ADD_ACTION] ADD_DISABLED_ACTION';
export const ADD_SAVE_ACTION: string = '[ADD_ACTION] ADD_SAVE_ACTION';

export interface IAddState {
    type: string;
    payload?: any;
}

export class AddInitialState implements IAddState {
    type: string = ADD_DISABLED_ACTION;
    payload?: any;
    constructor() { }
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
    ADD_ACTIVE_ACTION, ADD_DISABLED_ACTION, ADD_SAVE_ACTION
};