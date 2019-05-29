import { createSelector, Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerFacade {
  public getMode = createSelector(
    (state: AppState) => state.drawer.mode,
    mode => mode
  );
}
