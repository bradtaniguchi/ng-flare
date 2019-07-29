import { createReducer, Action, on } from '@ngrx/store';
import { Dashboard } from '../../models/dashboard';
import { dashboardActions } from './dashboard.actions';

export interface DashboardState {
  loading: boolean;
  dashboard?: Dashboard;
}

const initialState: DashboardState = {
  loading: false
};

const reducer = createReducer(
  initialState,
  // create
  on(dashboardActions.create, state => ({ ...state, loading: true })),
  on(dashboardActions.createSuccess, (state, { dashboard }) => ({
    ...state,
    loading: false,
    dashboard
  })),
  on(dashboardActions.createFailed, state => ({
    ...state,
    loading: false
  })),

  // get
  on(dashboardActions.get, state => ({ ...state, loading: true })),
  on(dashboardActions.getUpdate, (state, { dashboard }) => ({
    ...state,
    loading: false,
    dashboard
  })),
  on(dashboardActions.getFailed, state => ({ ...state, loading: false })),
  on(dashboardActions.getStop, state => ({ ...state, loading: false })),

  // update
  on(dashboardActions.update, state => ({ ...state, loading: true })),
  on(dashboardActions.updateSuccess, (state, { dashboard }) => ({
    ...state,
    loading: false,
    dashboard: { ...state.dashboard, ...dashboard }
  })),
  on(dashboardActions.updateFailed, state => ({ ...state, loading: false }))
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return reducer(state, action);
}
