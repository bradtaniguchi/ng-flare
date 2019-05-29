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
  }
  return state;
}
