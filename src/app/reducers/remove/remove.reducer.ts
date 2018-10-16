import { RemoveInitialState, IRemoveState, RemoveActionsList } from './remove.actions';

export function RemoveReducer(state = new RemoveInitialState(), action: IRemoveState) {
    switch (action.type) {
        case RemoveActionsList.REMOVE_ACTIVE:
            return {
                ...state,
                ...action,
                paylod: { ...action.payload }
            }
        case RemoveActionsList.REMOVE_INIT:
            return new RemoveInitialState();
        default:
            return state;
    }
}