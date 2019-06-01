import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { AppState } from '../app-state';

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
}
