import { Action } from '@ngrx/store';

export enum DeckActionTypes {
  CREATE = '[Deck] CREATE',
  CREATE_SUCCESS = '[Deck] CREATE_SUCCESS',
  CREATE_FAILED = '[Deck] CREATE_FAILED'
}

export type DeckActions = CreateDeck | CreateDeckSuccess | CreateDeckFailed;

export class CreateDeck implements Action {
  readonly type = DeckActionTypes.CREATE;
  constructor(public payload: {}) {}
}

export class CreateDeckSuccess implements Action {
  readonly type = DeckActionTypes.CREATE_SUCCESS;
}

export class CreateDeckFailed implements Action {
  readonly type = DeckActionTypes.CREATE_FAILED;
}
