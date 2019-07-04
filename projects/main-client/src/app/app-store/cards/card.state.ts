import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Card } from '../../models/card';
import { cardActions } from './card.actions';
import { createCrudReducerHandlers } from '../create-crud-reducer';

export interface CardState extends EntityState<Card> {
  loading: boolean;
}

export const cardAdapter = createEntityAdapter<Card>({
  selectId: card => card.uid
});

const initialState: CardState = { loading: false, ids: [], entities: {} };

const reducer = createReducer(
  initialState,
  ...createCrudReducerHandlers({
    actions: cardActions,
    adapter: cardAdapter
  })
);
export function CardReducer(state: CardState, action: Action) {
  return reducer(state, action);
}
