import { TraineesModel } from 'src/app/models/trainees.model';

export const REMOVE_ACTIVE: string = '[REMOVE_ACTION] REMOVE_ACTIVE';
export const REMOVE_INIT: string = '[REMOVE_ACTION] REMOVE_INIT';



export interface IRemoveState {
    type: string;
    payload: TraineesModel;
}


export class RemoveInitialState implements IRemoveState {
    type: string = REMOVE_INIT;
    payload: TraineesModel;
    constructor() {
        this.type = REMOVE_INIT;
    };
}
export class RemoveState implements IRemoveState {
    type: string;
    payload: TraineesModel;
    constructor(type: string, payload: TraineesModel) {
        this.type = type;
        this.payload = payload;
    };
}

export const RemoveActionsList = {
    REMOVE_ACTIVE, REMOVE_INIT
};