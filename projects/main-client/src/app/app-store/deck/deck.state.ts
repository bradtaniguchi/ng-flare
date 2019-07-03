import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Deck } from '../../models/deck';
import { deckActions } from './deck.actions';

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
export const DeckReducer = createReducer(
  initialState,
  on(deckActions.createSuccess, (state, { entity }) =>
    deckAdapter.upsertOne(entity, state)
  ),
  on(deckActions.bulkCreateSuccess, (state, { entities }) =>
    deckAdapter.upsertMany(entities, state)
  ),
  on(deckActions.searchUpdate, (state, { entities }) =>
    deckAdapter.upsertMany(entities, state)
  ),
  on(deckActions.bulkUpdateSuccess, (state, { entities }) =>
    deckAdapter.upsertMany(entities, state)
  )
);
