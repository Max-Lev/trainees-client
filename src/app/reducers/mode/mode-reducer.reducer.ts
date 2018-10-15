import { Action } from '@ngrx/store';
import { PANELDETAILSACTIONTYPES, IModeState, ModeStateInitial, SAVEMODEACTIONTYPES, REMOVEMODEACTIONTYPES } from './mode-reducer.actions';

export function ModeReducer(state = new ModeStateInitial(), action: IModeState): IModeState {
  switch (action.type) {
    case PANELDETAILSACTIONTYPES.PANEL_DETAILS_CLOSED:
      const panelStateClosed = {
        ...action, ...state,
        type: action.type,
        panelState: { ...action.panelState },
        saveState: { ...action.saveState },
        removeState: { ...action.removeState }
      };
      console.log('panelStateClosed: ', panelStateClosed);
      return panelStateClosed;
    case PANELDETAILSACTIONTYPES.PANEL_DETAILS_EDIT:
      const panelStateEdit = {
        ...action, ...state,
        type: action.type,
        panelState: { ...action.panelState },
        saveState: { ...action.saveState },
        removeState: { ...action.removeState }
      };
      console.log('panelStateEdit: ', panelStateEdit);
      return panelStateEdit;
    case PANELDETAILSACTIONTYPES.PANEL_DETAILS_SAVE:
      const panelStateSave = {
        ...action, ...state,
        type: action.type,
        panelState: { ...action.panelState },
        saveState: { ...action.saveState },
        removeState: { ...action.removeState }
      };
      console.log('panelStateSave: ', panelStateSave);
      return panelStateSave;

    case SAVEMODEACTIONTYPES.SAVE_FALSE:
      const saveFalse = {
        ...state, ...action,
        type: action.type,
        panelState: { ...action.panelState },
        saveState: {
          ...action.saveState,
          isSave: false
        },
        removeState: { ...action.removeState }
      };
      console.log(saveFalse);
      return saveFalse;
    case SAVEMODEACTIONTYPES.SAVE_TRUE:
      const saveTrue = {
        ...state, ...action,
        type: action.type,
        panelState: { ...action.panelState },
        saveState: {
          ...action.saveState,
          isSave: true
        },
        removeState: { ...action.removeState }
      };
      console.log('saveTrue: ', saveTrue);
      return saveTrue;
    case REMOVEMODEACTIONTYPES.REMOVE_TRUE:
      const removeTrue = {
        ...state, ...action,
        type: action.type,
        panelState: { ...action.panelState },
        saveState: { ...action.saveState },
        removeState: { ...action.removeState }
      };
      console.log('removeTrue: ', saveTrue);
      return removeTrue;
    case REMOVEMODEACTIONTYPES.REMOVE_FALSE:
      const removefalse = {
        ...state, ...action,
        type: action.type,
        panelState: { ...action.panelState },
        saveState: { ...action.saveState },
        removeState: { ...action.removeState }
      };
      console.log('removefalse: ', saveFalse);
      return saveFalse;

    default:
      return state;
  }

}
