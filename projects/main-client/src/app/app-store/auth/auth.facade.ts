import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private authState = createFeatureSelector<AuthState>(
    'auth' as keyof AppState
  );
  public getUserState = createSelector(
    this.authState,
    state => state.user
  );
  public getCredentialState = createSelector(
    this.authState,
    state => state.credentials
  );
  public getNewRegisterState = createSelector(
    this.authState,
    state => state.newRegister
  );
  constructor(private store: Store<AppState>) {}
}
