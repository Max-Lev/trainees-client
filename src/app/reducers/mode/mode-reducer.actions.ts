import { Action } from '@ngrx/store';
import { TraineesModel } from 'src/app/models/trainees.model';

export enum PANELDETAILSACTIONTYPES {
  PANEL_DETAILS_CLOSED = '[PANEL_DETAILS] PANEL_DETAILS_CLOSED',
  PANEL_DETAILS_EDIT = '[PANEL_DETAILS] PANEL_DETAILS_EDIT',
  PANEL_DETAILS_SAVE = '[PANEL_DETAILS] PANEL_DETAILS_SAVE',
}
export enum SAVEMODEACTIONTYPES {
  SAVE_TRUE = '[SAVE_MODE] SAVE_TRUE',
  SAVE_FALSE = '[SAVE_MODE] SAVE_FALSE'
}
export enum REMOVEMODEACTIONTYPES {
  REMOVE_TRUE = '[REMOVE_MODE] REMOVE_TRUE',
  REMOVE_FALSE = '[REMOVE_MODE] REMOVE_FALSE'
}

export interface IPanelModeState {
  type: string;
  trainee?: TraineesModel;
}
export class PanelModeInitial implements IPanelModeState {
  type: string = PANELDETAILSACTIONTYPES.PANEL_DETAILS_CLOSED;
  // payload?:any;
  trainee?: TraineesModel;
  constructor() { };
};
export class PanelModeState implements IPanelModeState {
  type: string;
  trainee: TraineesModel;
  constructor(type: string, trainee?: TraineesModel) {
    this.type = type;
    this.trainee = trainee;
    console.log('PanelModeState: ',this)
  }
};
export interface ISaveModeState {
  type: string;
  payload: any;
};
export class SaveModeInitial implements ISaveModeState {
  type: string = SAVEMODEACTIONTYPES.SAVE_FALSE;
  payload: any = {
    isSave: false
  };
};
export class SaveModeState implements ISaveModeState {
  type: string;
  payload: any;
  constructor(type: SAVEMODEACTIONTYPES) {
    this.type = type;
    this.payload = {
      isSave: (this.type === SAVEMODEACTIONTYPES.SAVE_TRUE) ? true : false
    };
  };
};

export interface IRemoveModeState {
  type: string;
  payload: any;
};
export class RemoveModeInitial implements IRemoveModeState {
  type: string = REMOVEMODEACTIONTYPES.REMOVE_FALSE;
  payload: any = {
    disabled: true
  }
  constructor() { }
}
export class RemoveModeState implements IRemoveModeState {
  type: string = REMOVEMODEACTIONTYPES.REMOVE_FALSE;
  payload: any = {
    disabled: true
  }
  constructor(type: string) {
    this.type = type;
    this.payload = {
      disabled: this.type
    }
  }
}

export interface IModeState {
  type: string;
  payload: any;
  panelState: IPanelModeState;
  saveState: ISaveModeState;
  removeState: IRemoveModeState;
}
export class ModeStateInitial implements IModeState {
  type: string;
  payload: any;
  panelState: IPanelModeState = new PanelModeInitial();
  saveState: ISaveModeState = new SaveModeInitial();
  removeState: IRemoveModeState = new RemoveModeInitial();
}
export class ModeState implements IModeState {
  type: string;
  payload: any;
  panelState: PanelModeState;
  saveState: SaveModeState;
  removeState: RemoveModeState;
  constructor(type: string, panelState?: PanelModeState, saveState?: SaveModeState, removeState?: RemoveModeState) {
    this.type = type;
    this.panelState = { ...panelState };
    this.saveState = { ...saveState };
    this.removeState = { ...removeState };
  }
}