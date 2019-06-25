import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Deck } from '../../models/deck';
import { SearchParams } from '../../models/search-params';
import { DeckActions, DeckActionTypes } from './deck.actions';
import { getDefaultState } from '../get-default-state';

export interface DeckState extends EntityState<Deck> {
  loading: boolean;
}

export const deckAdapter = createEntityAdapter<Deck>({
  selectId: deck => deck.uid
});

export function DeckReducer(
  state: DeckState = getDefaultState({ loading: false }),
  action: DeckActions
): DeckState {
  switch (action.type) {
    case DeckActionTypes.CREATE_SUCCESS:
      return deckAdapter.addOne(action.payload.deck, state);
    case DeckActionTypes.LIST_GROUP_DECKS:
      return { ...state, loading: true, ...action.payload };
    case DeckActionTypes.LIST_GROUP_DECKS_UPDATE:
      return deckAdapter.upsertMany(action.payload.decks, {
        ...state,
        loading: false
      });
    default:
      return state;
  }
}
