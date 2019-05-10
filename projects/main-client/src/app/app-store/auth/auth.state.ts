import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthState } from './auth.state';
import { User } from '../../models/user';
import { auth } from 'firebase/app';

export interface AuthState {
  newRegister?: boolean;
  credentials?: auth.UserCredential;
  user?: User;
}

export function AuthReducer(
  state: AuthState = {},
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.STATE_CHANGE:
      return { ...state, ...action.payload };
    case AuthActionTypes.REGISTER_SUCCESS:
      return { ...state, newRegister: true };
    case AuthActionTypes.ONLY_UPDATE_SUCCESS:
      return { ...state, newRegister: false };
    case AuthActionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
}
