import { Action } from '@ngrx/store';

export enum DrawerActionTypes {
  SET_MODE = '[Drawer] SET_MODE',

  OPEN = '[Drawer] OPEN',
  CLOSE = '[Drawer] CLOSE',
  TOGGLE = '[Drawer] TOGGLE'
}

export type DrawerActions =
  | SetDrawerMode
  | OpenDrawer
  | CloseDrawer
  | ToggleDrawer;

export class SetDrawerMode implements Action {
  readonly type = DrawerActionTypes.SET_MODE;
  constructor(public payload: { mode: 'open' | 'side' | 'push' }) {}
}

export class OpenDrawer implements Action {
  readonly type = DrawerActionTypes.OPEN;
}
export class CloseDrawer implements Action {
  readonly type = DrawerActionTypes.CLOSE;
}

export class ToggleDrawer implements Action {
  readonly type = DrawerActionTypes.TOGGLE;
}
