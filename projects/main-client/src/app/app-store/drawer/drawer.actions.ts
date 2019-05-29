import { Action } from '@ngrx/store';

export enum DrawerActionTypes {
  SET_MODE = '[Drawer] SET_MODE'
}

export type DrawerActions = SetDrawerMode;

export class SetDrawerMode implements Action {
  readonly type = DrawerActionTypes.SET_MODE;
  constructor(public payload: { mode: 'open' | 'side' | 'push' }) {}
}
