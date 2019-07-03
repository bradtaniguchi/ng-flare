import { createAction, props } from '@ngrx/store';
import { Card } from '../../models/card';
import { Deck } from '../../models/deck';
import { createCrudActions } from '../create-crud-actions';

export const cardActions = {
  ...createCrudActions<Card>({ type: 'Card' }),
  // deprecate
  searchDeckCards: createAction(
    '[Card] SEARCH_DECK_CARDS',
    props<{ deckId: string }>()
  ),
  // deprecate
  searchDeckCardsSuccess: createAction(
    '[Card] SEARCH_DECK_CARDS_SUCCESS',
    props<{ deckId: string; entities: Card[] }>()
  ),
  // deprecate
  searchDeckCardsFailed: createAction(
    '[Card] SEARCH_DECK_CARDS_FAILED',
    props<{ deckId: string }>()
  ),
  createWithDeck: createAction(
    '[Card] CREATE_WITH_DECK',
    props<{ deck: Deck; cards: Array<Partial<Card>> }>()
  ),
  createWithDeckSuccess: createAction(
    '[Card] CREATE_WITH_DECK_SUCCESS',
    props<{ entities: Card[] }>()
  ),
  createWithDeckFailed: createAction(
    '[Card] CREATE_WITH_DECK_FAILED',
    props<{ deck: Deck; cards: Array<Partial<Card>> }>()
  )
};
