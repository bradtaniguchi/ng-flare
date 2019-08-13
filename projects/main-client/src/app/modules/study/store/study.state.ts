import { createReducer, Action, on } from '@ngrx/store';
import { studyActions } from './study.actions';

export interface StudyState {
  /**
   * The card we are currently looking at
   */
  card?: string;
  /**
   * If we are loading the deck async
   */
  loadingDeck?: boolean;
  /**
   * The deckId we are studying
   */
  deck?: string;
  /**
   * If we are showing the "back" of the card
   */
  flipped?: boolean;
  /**
   * When the study session was started
   */
  startedOn?: Date;
  /**
   * When the study session was stopped or completed
   */
  stoppedOn?: Date;
  /**
   * The cardIds the user is studying
   * @deprecated
   */
  cards?: string[];
  /**
   * List of cards marked as skipped
   */
  wrong?: string[];
  /**
   * List of cards marked as correct
   */
  correct?: string[];
  /**
   * List of cards skipped
   */
  skipped?: string[];
}

const reducer = createReducer(
  {
    cards: [],
    wrong: [],
    correct: [],
    skipped: []
  } as StudyState,
  on(studyActions.start, (state, { startedOn }) => ({ ...state, startedOn })),
  on(studyActions.stop, (state, { stopped }) => ({ ...state, stopped })),
  on(studyActions.clear, () => ({
    cards: [],
    wrong: [],
    correct: [],
    skipped: []
  })),
  on(studyActions.setDeck, (state, { deckId: deck }) => ({ ...state, deck })),
  on(studyActions.selectCard, (state, { card }) => ({ ...state, card })),

  // card action
  on(studyActions.markCardCorrect, (state, { card }) => ({
    ...state,
    correct: [...state.correct, card]
  })),
  on(studyActions.markCardWrong, (state, { card }) => ({
    ...state,
    wrong: [...state.wrong, card]
  })),
  on(studyActions.skipCard, (state, { card }) => ({
    ...state,
    skipped: [...state.skipped, card]
  }))
);

export function StudyReducer(state: StudyState, action: Action) {
  return reducer(state, action);
}
