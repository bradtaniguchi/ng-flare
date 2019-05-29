import { AuthState } from './auth/auth.state';
import { DrawerState } from './drawer/drawer.state';
import { DashboardState } from '../modules/dashboard/store/dashboard.state';

export interface AppState {
  auth: AuthState;
  loading: boolean;
  drawer: DrawerState;
  // lazy loaded state
  dashboard?: DashboardState;
}
