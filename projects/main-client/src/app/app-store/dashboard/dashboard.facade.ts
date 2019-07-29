import { AppState } from '../app-state';
import { Store, createSelector } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { dashboardActions } from './dashboard.actions';
import { User } from '../../models/user';
import { Dashboard } from '../../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardFacadeService {
  public selectLoading = createSelector(
    (state: AppState) => state.dashboard.loading,
    _ => _
  );
  public selectDashboard = createSelector(
    (state: AppState) => state.dashboard.dashboard,
    _ => _
  );
  constructor(private store: Store<AppState>) {}

  /**
   * Creates a new dashboard for the given user
   */
  public create(params: { user: User }) {
    this.store.dispatch(dashboardActions.create(params));
  }

  /**
   * Updates the dashboard for the given user
   */
  public update(params: { user: User; dashboard: Partial<Dashboard> }) {
    this.store.dispatch(dashboardActions.update(params));
  }

  /**
   * Gets the dashboard for the given user
   */
  public get(params: { user: User; callNum: number }) {
    this.store.dispatch(dashboardActions.get(params));
  }

  /**
   * Stops getting updates for the given user dashboard
   */
  public getStop(params: { callNum: number }) {
    this.store.dispatch(dashboardActions.getStop(params));
  }
}
