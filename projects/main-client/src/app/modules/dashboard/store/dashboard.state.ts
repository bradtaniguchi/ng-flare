import { DashboardActions, DashboardActionTypes } from './dashboard.actions';
import { Deck } from '../../../models/deck';
import { SearchParams } from '../../../models/search-params';

export interface DashboardState extends SearchParams<Deck> {
  loading: boolean;
  decks: Deck[];
}

export function DashboardReducer(
  state: DashboardState = {
    loading: false,
    decks: [],
    orderBy: 'name',
    limit: 2
  },
  action: DashboardActions
): DashboardState {
  switch (action.type) {
    case DashboardActionTypes.GET_DECKS:
      return { ...state, loading: true, ...action.payload };
    case DashboardActionTypes.GET_DECKS_UPDATE:
      return { ...state, loading: false, ...action.payload };
    case DashboardActionTypes.GET_DECKS_FAILED:
      return { ...state, loading: false, decks: [] };
  }
  return state;
}
