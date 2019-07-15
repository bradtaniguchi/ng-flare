import { AuthState } from './auth/auth.state';
import { DrawerState } from './drawer/drawer.state';
import { GroupState } from './group/group.state';
import { DeckState } from './deck/deck.state';
import { CardState } from './cards/card.state';
import { LoadingState } from './loading/loading.state';
import { RouteState } from './route/route.state';
import { StudyState } from '../modules/study/store/study.state';
import { UserState } from './user/user.state';

export interface AppState {
  auth: AuthState;
  loading: LoadingState;
  route: RouteState;
  drawer: DrawerState;
  group: GroupState;
  deck: DeckState;
  card: CardState;
  user: UserState;
  // lazy loaded state
  study?: StudyState;
}
