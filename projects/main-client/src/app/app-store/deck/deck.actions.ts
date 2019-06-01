import { Action } from '@ngrx/store';
import { Deck } from '../../models/deck';
import { SearchParams } from '../../models/search-params';

export enum DeckActionTypes {
  CREATE = '[Deck] CREATE',
  CREATE_SUCCESS = '[Deck] CREATE_SUCCESS',
  CREATE_FAILED = '[Deck] CREATE_FAILED',

  LIST_GROUP_DECKS = '[Deck] LIST_GROUP_DECKS',
  LIST_GROUP_DECKS_UPDATE = '[Deck] LIST_GROUP_DECKS_UPDATE',
  LIST_GROUP_DECKS_FAILED = '[Deck] LIST_GROUP_DECKS_FAILED',
  LIST_GROUP_DECKS_STOP = '[Deck] LIST_GROUP_DECKS_STOP'
}

export type DeckActions =
  | CreateDeck
  | CreateDeckSuccess
  | CreateDeckFailed
  | ListGroupDecks
  | ListGroupDecksUpdate
  | ListGroupDecksStop
  | ListGroupDecksFailed;

export class CreateDeck implements Action {
  readonly type = DeckActionTypes.CREATE;
  constructor(
    public payload: {
      deck: Partial<Deck>;
    }
  ) {}
}

export class CreateDeckSuccess implements Action {
  readonly type = DeckActionTypes.CREATE_SUCCESS;
  constructor(
    public payload: {
      deck: Deck;
    }
  ) {}
}

export class CreateDeckFailed implements Action {
  readonly type = DeckActionTypes.CREATE_FAILED;
}

export class ListGroupDecks implements Action {
  readonly type = DeckActionTypes.LIST_GROUP_DECKS;
  constructor(public payload?: Partial<SearchParams<Deck>>) {}
}

export class ListGroupDecksUpdate implements Action {
  readonly type = DeckActionTypes.LIST_GROUP_DECKS_UPDATE;
  constructor(public payload: { decks: Deck[] }) {}
}

export class ListGroupDecksStop implements Action {
  readonly type = DeckActionTypes.LIST_GROUP_DECKS_STOP;
}

export class ListGroupDecksFailed implements Action {
  readonly type = DeckActionTypes.LIST_GROUP_DECKS_FAILED;
}
