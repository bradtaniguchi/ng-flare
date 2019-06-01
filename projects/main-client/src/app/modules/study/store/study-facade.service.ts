import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { StudyState } from './study.state';
import { AppState } from '../../../app-store/app-state';
import { DateTime, Duration } from 'luxon';
import {
  ClearStudySession,
  StartStudySession,
  SetStudyDeck,
  SelectStudyCard,
  SkipStudyCard,
  MarkStudyCardCorrect,
  MarkStudyCardWrong
} from './study.actions';
import { Card } from '../../../models/card';
import { Deck } from '../../../models/deck';

@Injectable({
  providedIn: 'root'
})
export class StudyFacadeService {
  private studyState = createFeatureSelector<StudyState>(
    'study' as keyof AppState
  );
  public getCard = createSelector(
    this.studyState,
    state => state.card
  );
  public getDeck = createSelector(
    this.studyState,
    state => state.deck
  );
  public getFlipped = createSelector(
    this.studyState,
    state => state.flipped
  );
  public getStartedOn = createSelector(
    this.studyState,
    state => state.startedOn
  );
  public getStoppedOn = createSelector(
    this.studyState,
    state => state.stoppedOn
  );
  // public getPrevious = createSelector(
  //   this.studyState,
  //   state => state.previous
  // );
  public getCards = createSelector(
    this.studyState,
    state => state.cards
  );
  public getMissed = createSelector(
    this.studyState,
    state => state.missed
  );
  public getCorrect = createSelector(
    this.studyState,
    state => state.correct
  );
  public getSkipped = createSelector(
    this.studyState,
    state => state.skipped
  );

  // calculated selectors
  public getDuration = createSelector(
    this.studyState,
    state => this.getDurationFromStart(state.startedOn)
  );

  constructor(private store: Store<AppState>) {}

  /**
   * Returns the duration from the start date
   */
  private getDurationFromStart(start: Date): Duration {
    return DateTime.fromJSDate(start).diffNow();
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
