import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Deck } from '../../models/deck';
import { deckActions } from './deck.actions';
import { createCrudReducerHandlers } from '../create-crud-reducer';

export interface DeckState extends EntityState<Deck> {
  loading: boolean;
}

export const deckAdapter = createEntityAdapter<Deck>({
  selectId: deck => deck.uid
});

const initialState: DeckState = {
  loading: false,
  ids: [],
  entities: {}
};
const reducer = createReducer(
  initialState,
  ...createCrudReducerHandlers({
    actions: deckActions,
    adapter: deckAdapter
  })
);
export function DeckReducer(state: DeckState, action: Action) {
  return reducer(state, action);
}
