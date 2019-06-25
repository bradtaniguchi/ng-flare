import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Card } from '../../models/card';
import { getDefaultState } from '../get-default-state';
import { CardActions, CardActionTypes } from './card.actions';

export interface CardState extends EntityState<Card> {
  loading: boolean;
}

export const cardAdapter = createEntityAdapter<Card>({
  selectId: card => card.uid
});

export function CardReducer(
  state: CardState = getDefaultState({ loading: false }),
  action: CardActions
) {
  switch (action.type) {
    case CardActionTypes.CREATE_SUCCESS:
      return cardAdapter.addMany(action.payload.cards, state);
    case CardActionTypes.LIST_DECK_CARDS:
      return { ...state, loading: true, ...action.payload };
    case CardActionTypes.LIST_DECK_CARDS_FAILED:
      return { ...state, loading: false };
    case CardActionTypes.LIST_DECK_CARDS_UPDATE:
      return cardAdapter.upsertMany(action.payload.cards, {
        ...state,
        loading: false
      });
    default:
      return state;
  }
}
