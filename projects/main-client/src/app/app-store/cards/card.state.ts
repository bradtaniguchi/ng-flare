import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Card } from '../../models/card';
import { cardActions } from './card.actions';

export interface CardState extends EntityState<Card> {
  loading: boolean;
}

export const cardAdapter = createEntityAdapter<Card>({
  selectId: card => card.uid
});

const initialState: CardState = { loading: false, ids: [], entities: {} };

const reducer = createReducer(
  initialState,
  on(cardActions.create, state => ({
    ...state
  })),
  on(cardActions.createSuccess, (state, { entity }) =>
    cardAdapter.upsertOne(entity, state)
  ),
  on(cardActions.bulkCreateSuccess, (state, { entities }) =>
    cardAdapter.upsertMany(entities, state)
  ),
  on(cardActions.searchDeckCardsSuccess, (state, { entities }) =>
    cardAdapter.upsertMany(entities, state)
  ),
  on(cardActions.bulkUpdateSuccess, (state, { entities }) =>
    cardAdapter.upsertMany(entities, state)
  )
);
export function CardReducer(state: CardState, action: Action) {
  return reducer(state, action);
}
