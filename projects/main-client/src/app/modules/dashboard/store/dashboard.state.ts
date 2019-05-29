import { DashboardActions, DashboardActionTypes } from './dashboard.actions';
import { Deck } from '../../../models/deck';
import { SearchParams } from '../../../models/search-params';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
export interface DashboardState extends EntityState<Deck>, SearchParams<Deck> {
  loading: boolean;
}

export const dashboardAdapter = createEntityAdapter<Deck>({
  selectId: deck => deck.uid
});

// TODO: add searchParamAdapter

export function DashboardReducer(
  state: DashboardState = {
    loading: false,
    ids: [],
    entities: {},
    orderBy: 'name',
    limit: 2
  },
  action: DashboardActions
): DashboardState {
  switch (action.type) {
    case DashboardActionTypes.GET_DECKS:
      return { ...state, loading: true, ...action.payload };
    case DashboardActionTypes.GET_DECKS_UPDATE:
      return dashboardAdapter.upsertMany(action.payload.decks, {
        ...state,
        loading: false
      });
    case DashboardActionTypes.GET_DECKS_FAILED:
      return dashboardAdapter.removeAll({ ...state, loading: false });
  }
  return state;
}
