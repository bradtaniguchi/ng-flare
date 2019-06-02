import { AuthState } from './auth/auth.state';
import { DrawerState } from './drawer/drawer.state';
import { DashboardState } from '../modules/dashboard/store/dashboard.state';
import { GroupState } from './group/group.state';
import { DeckState } from './deck/deck.state';
import { CardState } from './cards/card.state';
import { LoadingState } from './loading/loading.state';
import { RouteState } from './route/route.state';

export interface AppState {
  auth: AuthState;
  loading: LoadingState;
  route: RouteState;
  drawer: DrawerState;
  group: GroupState;
  deck: DeckState;
  card: CardState;
  // lazy loaded state
  dashboard?: DashboardState;
}
