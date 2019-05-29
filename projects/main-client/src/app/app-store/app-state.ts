import { AuthState } from './auth/auth.state';
import { DrawerState } from './drawer/drawer.state';

export interface AppState {
  auth: AuthState;
  loading: boolean;
  drawer: DrawerState;
}
