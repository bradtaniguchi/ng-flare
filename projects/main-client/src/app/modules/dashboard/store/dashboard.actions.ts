import { Deck } from '../../../models/deck';
import { SearchParams } from '../../../models/search-params';

export enum DashboardActionTypes {
  GET_DECKS = '[Dashboard] GET_DECKS',
  GET_DECKS_UPDATE = '[Dashboard] GET_DECKS_UPDATE',
  GET_DECKS_FAILED = '[Dashboard] GET_DECKS_FAILED',
  GET_STOP = '[Dashboard] GET_STOP'
}

export type DashboardActions =
  | GetDashboardDecks
  | DashboardDecksUpdate
  | GetDashboardDecksFailed
  | StopGetDashboard;

export class GetDashboardDecks {
  readonly type = DashboardActionTypes.GET_DECKS;
  constructor(public payload: Partial<SearchParams<Deck>>) {}
}

export class DashboardDecksUpdate {
  readonly type = DashboardActionTypes.GET_DECKS_UPDATE;
  constructor(public payload: { decks: Deck[] }) {}
}

export class GetDashboardDecksFailed {
  readonly type = DashboardActionTypes.GET_DECKS_FAILED;
}

export class StopGetDashboard {
  readonly type = DashboardActionTypes.GET_STOP;
}
