import { Injectable } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { DashboardState } from './dashboard.state';
import { GetDashboardDecks } from './dashboard.actions';

@Injectable({
  providedIn: 'root'
})
export class DashboardFacadeService {
  public loading = createSelector(
    this.selectState,
    state => state.loading
  );
  public decks = createSelector(
    this.selectState,
    state => state.decks
  );
  constructor(private store: Store<AppState>) {}

  private selectState(state: { dashboard: DashboardState }) {
    return state.dashboard;
  }

  public getDecks(params: any) {
    this.store.dispatch(new GetDashboardDecks(params));
  }
}
