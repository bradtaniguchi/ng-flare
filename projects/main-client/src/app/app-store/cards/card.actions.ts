import { Card } from '../../models/card';
import { Action, createAction, props } from '@ngrx/store';
import { SearchParams } from '../../models/search-params';
import { Deck } from '../../models/deck';
import { createCrudActions } from '../create-crud-actions';

export const cardActions = {
  ...createCrudActions<Card>({ type: 'Card' }),
  searchDeckCards: createAction(
    '[Card] SEARCH_DECK_CARDS',
    props<{ deckId: string }>()
  ),
  searchDeckCardsSuccess: createAction(
    '[Card] SEARCH_DECK_CARDS_SUCCESS',
    props<{ deckId: string; entities: Card[] }>()
  ),
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

// export enum CardActionTypes {
//   CREATE = '[Card] CREATE',
//   CREATE_SUCCESS = '[Card] CREATE_SUCCESS',
//   CREATE_FAILED = '[Card] CREATE_FAILED',

//   LIST_DECK_CARDS = '[Card] LIST_DECK_CARDS',
//   LIST_DECK_CARDS_UPDATE = '[Card] LIST_DECK_CARDS_UPDATE',
//   LIST_DECK_CARDS_FAILED = '[Card] LIST_DECK_CARDS_FAILED',
//   LIST_DECK_CARDS_STOP = '[Card] LIST_DECK_CARDS_STOP'
// }

// export type CardActions =
//   | CreateCards
//   | CreateCardsSuccess
//   | CreateCardsFailed
//   | ListDeckCards
//   | ListDeckCardsUpdate
//   | ListDeckCardsStop
//   | ListDeckCardsFailed;

// export class CreateCards implements Action {
//   readonly type = CardActionTypes.CREATE;
//   constructor(
//     public payload: {
//       cards: Array<Partial<Card>>;
//       /**
//        * The deck the cards will go to
//        */
//       deck: Deck;
//     }
//   ) {}
// }

// export class CreateCardsSuccess implements Action {
//   readonly type = CardActionTypes.CREATE_SUCCESS;
//   constructor(
//     public payload: {
//       cards: Card[];
//     }
//   ) {}
// }

// export class CreateCardsFailed implements Action {
//   readonly type = CardActionTypes.CREATE_FAILED;
// }
// export interface ListDeckCardsParams extends Partial<SearchParams<Card>> {
//   deck: Deck;
// }

// export class ListDeckCards implements Action {
//   readonly type = CardActionTypes.LIST_DECK_CARDS;
//   constructor(public payload?: ListDeckCardsParams) {}
// }

// export class ListDeckCardsUpdate implements Action {
//   readonly type = CardActionTypes.LIST_DECK_CARDS_UPDATE;
//   constructor(public payload: { cards: Card[] }) {}
// }

// export class ListDeckCardsStop implements Action {
//   readonly type = CardActionTypes.LIST_DECK_CARDS_STOP;
// }

// export class ListDeckCardsFailed implements Action {
//   readonly type = CardActionTypes.LIST_DECK_CARDS_FAILED;
// }
