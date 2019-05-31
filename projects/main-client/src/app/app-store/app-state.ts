import { AuthState } from './auth/auth.state';
import { DrawerState } from './drawer/drawer.state';
import { DashboardState } from '../modules/dashboard/store/dashboard.state';
import { GroupState } from './group/group.state';
import { DeckState } from './deck/deck.state';

export interface AppState {
  auth: AuthState;
  loading: boolean;
  drawer: DrawerState;
  group: GroupState;
  deck: DeckState;
  // lazy loaded state
  dashboard?: DashboardState;
}
