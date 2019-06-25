import { Deck } from '../../../models/deck';
import { Card } from '../../../models/card';
import { StudyActions, StudyActionTypes } from './study.actions';

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
   */
  cards?: string[];
  /**
   * List of cards marked as skipped
   */
  missed?: string[];
  /**
   * List of cards marked as correct
   */
  correct?: string[];
  /**
   * List of cards skipped
   */
  skipped?: string[];
}
export function StudyReducer(
  state: StudyState = {},
  action: StudyActions
): StudyState {
  switch (action.type) {
    case StudyActionTypes.START:
    case StudyActionTypes.STOP:
    case StudyActionTypes.SET_DECK:
      return { ...state, ...action.payload };
    case StudyActionTypes.CLEAR:
      return {};
    default:
      return state;
  }
}
