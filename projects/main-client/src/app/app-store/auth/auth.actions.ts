import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { auth } from 'firebase/app';
import { LoginProvider } from '../../models/login-providers';

export enum AuthActionTypes {
  LOGIN = '[Auth] LOGIN',
  LOGIN_WITH_EMAIL = '[Auth] LOGIN_WITH_EMAIL',
  LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS',
  LOGIN_FAILED = '[Auth] LOGIN_FAILED',

  STATE_CHANGE = '[Auth] STATE_CHANGE',
  LOGOUT = '[Auth] LOGOUT',
  LOGOUT_SUCCESS = '[Auth] LOGOUT_SUCCESS',
  LOGOUT_FAILED = '[Auth] LOGOUT_FAILED',

  SET_CRED = '[Auth] SET_CRED',

  // AuthRegistration
  REGISTER = '[Auth] REGISTER',
  REGISTER_SUCCESS = '[Auth] REGISTER_SUCCESS',
  ONLY_UPDATE_SUCCESS = '[Auth] ONLY_UPDATE_SUCCESS',
  REGISTER_FAILED = '[Auth] REGISTER_FAILED'
}

export type AuthActions =
  // login
  | AuthLogin
  | AuthLoginWithEmail
  | AuthLoginSuccess
  | AuthLoginFailed
  | AuthStateChange
  | SetAuthCred
  // Logout
  | AuthLogout
  // AuthRegistration
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterOnlyUpdateSuccess
  | AuthRegisterFailed;

// LOGIN
export class AuthLoginWithEmail implements Action {
  readonly type = AuthActionTypes.LOGIN_WITH_EMAIL;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}
export class AuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(
    public payload: { type: 'popup' | 'redirect'; provider: LoginProvider }
  ) {}
}
export class AuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: User }) {}
}
export class AuthLoginFailed implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILED;
  constructor(public payload: { error: Error }) {}
}
export class SetAuthCred implements Action {
  readonly type = AuthActionTypes.SET_CRED;
  constructor(public payload: { credentials: auth.UserCredential }) {}
}
// STATE CHANGE
export class AuthStateChange implements Action {
  readonly type = AuthActionTypes.STATE_CHANGE;
  constructor(public payload: { user: User }) {}
}
// LOGOUT
export class AuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}
export class AuthLogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}
export class AuthLogoutFailed implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAILED;
}

// Auth Registration
export class AuthRegister implements Action {
  readonly type = AuthActionTypes.REGISTER;
  constructor(public payload: { user: firebase.User }) {}
}

// returned if we successfully registered the user
export class AuthRegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
}

export class AuthRegisterOnlyUpdateSuccess implements Action {
  readonly type = AuthActionTypes.ONLY_UPDATE_SUCCESS;
}
export class AuthRegisterFailed implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILED;
}
