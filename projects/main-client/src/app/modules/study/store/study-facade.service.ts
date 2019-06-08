import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { DateTime, Duration } from 'luxon';
import { AppState } from '../../../app-store/app-state';
import { Card } from '../../../models/card';
import { Deck } from '../../../models/deck';
import {
  ClearStudySession,
  GetStudyDeck,
  MarkStudyCardCorrect,
  MarkStudyCardWrong,
  SelectStudyCard,
  SetStudyDeck,
  SkipStudyCard,
  StartStudySession
} from './study.actions';

@Injectable({
  providedIn: 'root'
})
export class StudyFacadeService {
  public getCard = createSelector(
    (state: AppState) => state.study.card,
    _ => _
  );
  public getDeck = createSelector(
    (state: AppState) => state.study.deck,
    _ => _
  );
  public getFlipped = createSelector(
    (state: AppState) => state.study.flipped,
    _ => _
  );
  public getStartedOn = createSelector(
    (state: AppState) => state.study.startedOn,
    _ => _
  );
  public getStoppedOn = createSelector(
    (state: AppState) => state.study.stoppedOn,
    _ => _
  );
  public getCards = createSelector(
    (state: AppState) => state.study.cards,
    _ => _
  );
  public getMissed = createSelector(
    (state: AppState) => state.study.missed,
    _ => _
  );
  public getCorrect = createSelector(
    (state: AppState) => state.study.correct,
    _ => _
  );
  public getSkipped = createSelector(
    (state: AppState) => state.study.skipped,
    _ => _
  );

  // calculated selectors
  public getDuration = createSelector(
    (state: AppState) => state.study.startedOn,
    startedOn => this.getDurationFromStart(startedOn)
  );

  constructor(private store: Store<AppState>) {}

  /**
   * Returns the duration from the start date
   */
  private getDurationFromStart(start: Date): Duration {
    return DateTime.fromJSDate(start).diffNow();
  }

  /**
   * Loads a deck that doesn't update, then marks that deck as the
   * deck to study.
   */
  public loadDeck(deckId: string) {
    this.store.dispatch(new GetStudyDeck({ deckId }));
  }

  public startStudySession(startedOn: Date) {
    this.store.dispatch(new StartStudySession({ startedOn }));
  }

  public clearStudySession() {
    this.store.dispatch(new ClearStudySession());
  }

  public setStudyDeck(deck: Deck) {
    this.store.dispatch(new SetStudyDeck({ deck }));
  }

  public selectStudyCard(card: Card) {
    this.store.dispatch(new SelectStudyCard({ card: card.uid }));
  }

  public skipStudyCard() {
    this.store.dispatch(new SkipStudyCard());
  }

  public markStudyCardCorrect() {
    this.store.dispatch(new MarkStudyCardCorrect());
  }

  public markStudyCardWrong() {
    this.store.dispatch(new MarkStudyCardWrong());
  }
}
