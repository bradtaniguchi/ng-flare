import { Action } from '@ngrx/store';
import { Deck } from '../../../models/deck';

export enum StudyActionTypes {
  START = '[Study] START',
  CLEAR = '[Study] CLEAR',
  STOP = '[Study] STOP',
  SET_DECK = '[Study] SET_DECK',
  SELECT_CARD = '[Study] SELECT_CARD',
  SKIP_CARD = '[Study] SKIP_CARD',
  MARK_CARD_CORRECT = '[Study] MARK_CARD_CORRECT',
  MARK_CARD_WRONG = '[Study] MARK_CARD_WRONG'
}

export type StudyActions =
  | StartStudySession
  | ClearStudySession
  | StopStudySession
  | SetStudyDeck
  | SelectStudyCard
  | SkipStudyCard
  | MarkStudyCardCorrect
  | MarkStudyCardWrong;

export class StartStudySession implements Action {
  readonly type = StudyActionTypes.START;
  constructor(
    public payload: {
      startedOn: Date;
    }
  ) {}
}

export class ClearStudySession implements Action {
  readonly type = StudyActionTypes.CLEAR;
}

export class StopStudySession implements Action {
  readonly type = StudyActionTypes.STOP;
  constructor(public payload: { stopped: Date }) {}
}

export class SetStudyDeck implements Action {
  readonly type = StudyActionTypes.SET_DECK;
  constructor(public payload: { deck: Deck }) {}
}

export class SelectStudyCard implements Action {
  readonly type = StudyActionTypes.SELECT_CARD;
  constructor(public payload: { card: string }) {}
}

export class SkipStudyCard implements Action {
  readonly type = StudyActionTypes.SKIP_CARD;
}

export class MarkStudyCardCorrect implements Action {
  readonly type = StudyActionTypes.MARK_CARD_CORRECT;
}

export class MarkStudyCardWrong implements Action {
  readonly type = StudyActionTypes.MARK_CARD_WRONG;
}
