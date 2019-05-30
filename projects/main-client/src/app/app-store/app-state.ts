import { AuthState } from './auth/auth.state';
import { DrawerState } from './drawer/drawer.state';
import { DashboardState } from '../modules/dashboard/store/dashboard.state';
import { GroupState } from './group/group.state';

export interface AppState {
  auth: AuthState;
  loading: boolean;
  drawer: DrawerState;
  group: GroupState;
  // lazy loaded state
  dashboard?: DashboardState;
}
