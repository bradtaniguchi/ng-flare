import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { AuthLogin, AuthLoginWithEmail, AuthLogout } from './auth.actions';
import { LoginProvider } from '../../models/login-providers';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  public getUserState = createSelector(
    (state: AppState) => state.auth.user,
    _ => _
  );
  public getCredentialState = createSelector(
    (state: AppState) => state.auth.credentials,
    _ => _
  );
  public getNewRegisterState = createSelector(
    (state: AppState) => state.auth.newRegister,
    _ => _
  );
  constructor(private store: Store<AppState>) {}

  public login(params: {
    type: 'popup' | 'redirect';
    provider: LoginProvider;
  }) {
    this.store.dispatch(new AuthLogin(params));
  }

  public loginWithEmail(params: { email: string; password: string }) {
    this.store.dispatch(new AuthLoginWithEmail(params));
  }

  public logout() {
    this.store.dispatch(new AuthLogout());
  }
}
