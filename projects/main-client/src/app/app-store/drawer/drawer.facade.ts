import { createSelector, Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { Injectable } from '@angular/core';
import { ToggleDrawer, CloseDrawer, OpenDrawer } from './drawer.actions';

@Injectable({
  providedIn: 'root'
})
export class DrawerFacade {
  public getMode = createSelector(
    (state: AppState) => state.drawer.mode,
    _ => _
  );
  public getOpened = createSelector(
    (state: AppState) => state.drawer.opened,
    _ => _
  );

  constructor(private store: Store<AppState>) {}

  public toggleDrawer() {
    this.store.dispatch(new ToggleDrawer());
  }

  public closeDrawer() {
    this.store.dispatch(new CloseDrawer());
  }

  public openDrawer() {
    this.store.dispatch(new OpenDrawer());
  }
}
