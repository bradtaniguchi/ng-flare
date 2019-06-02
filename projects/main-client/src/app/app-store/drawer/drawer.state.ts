import { DrawerActions, DrawerActionTypes } from './drawer.actions';

export interface DrawerState {
  opened: boolean;
  mode: 'open' | 'side' | 'push';
}

export function DrawerReducer(
  state: DrawerState = {
    opened: true,
    mode: 'side'
  },
  action: DrawerActions
): DrawerState {
  switch (action.type) {
    case DrawerActionTypes.SET_MODE:
      return { ...state, ...action.payload };
    case DrawerActionTypes.OPEN:
      return { ...state, opened: true };
    case DrawerActionTypes.CLOSE:
      return { ...state, opened: false };
    case DrawerActionTypes.TOGGLE:
      return { ...state, opened: !state.opened };
    default:
      return state;
  }
}
