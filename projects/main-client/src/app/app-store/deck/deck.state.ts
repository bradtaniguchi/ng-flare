import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Deck } from '../../models/deck';
import { SearchParams } from '../../models/search-params';
import { DeckActionTypes } from './deck.actions';

export interface DeckState extends EntityState<Deck>, SearchParams<Deck> {
  loading: boolean;
}

export const deckAdapter = createEntityAdapter<Deck>({
  selectId: deck => deck.uid
});

export function DeckReducer(
  state: DeckState = {
    loading: false,
    ids: [],
    entities: {},
    orderBy: 'name',
    limit: 2
  },
  action: DeckActionTypes
): DeckState {
  // TODO
  return state;
}
