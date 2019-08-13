import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { DateTime, Duration } from 'luxon';
import { AppState } from '../../../app-store/app-state';
import { Card } from '../../../models/card';
import { studyActions } from './study.actions';
import { logger } from '../../../core/logger';
import { StudyService } from '../../../core/services/study/study.service';

@Injectable({
  providedIn: 'root'
})
export class StudyFacadeService {
  public getDeckSelector = createSelector(
    (state: AppState) => state.study.deck,
    (state: AppState) => state.deck.entities,
    (deck, entities) => (entities || {})[deck]
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
    (state: AppState) => state.study.deck,
    (state: AppState) => state.card.entities,
    (deck, entities) =>
      Object.values(entities).filter(card => card.deck === deck)
  );
  public getCard = createSelector(
    (state: AppState) => state.study.card,
    (state: AppState) => state.card.entities,
    (card, cards) => (cards || {})[card]
  );
  public getWrong = createSelector(
    (state: AppState) => state.study.wrong,
    (state: AppState) => state.card.entities,
    (cards, entities) => (cards || []).map(card => (entities || {})[card])
  );
  public getCorrect = createSelector(
    (state: AppState) => state.study.correct,
    (state: AppState) => state.card.entities,
    (cards, entities) => (cards || []).map(card => (entities || {})[card])
  );
  public getSkipped = createSelector(
    (state: AppState) => state.study.skipped,
    (state: AppState) => state.card.entities,
    (cards, entities) => (cards || []).map(card => (entities || {})[card])
  );
  public getNext = createSelector(
    this.getCards,
    this.getWrong,
    this.getCorrect,
    this.getSkipped,
    (cards, wrong, correct, skipped) =>
      this.studyService.getNextCard({ cards, wrong, correct, skipped })
  );
  public getPrevious = createSelector(
    this.getWrong,
    this.getCorrect,
    this.getSkipped,
    (wrong, correct, skipped) =>
      this.studyService.getPrevious({ wrong, correct, skipped })
  );
  public getCompletedPercentage = createSelector(
    this.getCards,
    this.getWrong,
    this.getCorrect,
    this.getSkipped,
    (cards, wrong, correct, skipped) =>
      this.studyService.getCompletedPercentage({
        cards,
        wrong,
        correct,
        skipped
      })
  );

  // calculated selectors
  public getDuration = createSelector(
    (state: AppState) => state.study.startedOn,
    startedOn => this.getDurationFromStart(startedOn)
  );

  constructor(
    private store: Store<AppState>,
    private studyService: StudyService
  ) {}

  /**
   * Returns the duration from the start date
   */
  private getDurationFromStart(start: Date): Duration {
    return DateTime.fromJSDate(start).diffNow();
  }

  public startStudySession(startedOn: Date) {
    this.store.dispatch(studyActions.start({ startedOn }));
  }

  public selectStudyDeck(deckId: string) {
    this.store.dispatch(studyActions.setDeck({ deckId }));
  }

  public clearStudySession() {
    this.store.dispatch(studyActions.clear());
  }

  public selectStudyCard(card: Card) {
    this.store.dispatch(studyActions.selectCard({ card: card.uid }));
  }

  private getId(card: Card | string): string {
    return typeof card === 'object' ? card.uid : card;
  }

  public skipStudyCard(card: Card | string) {
    this.store.dispatch(studyActions.skipCard({ card: this.getId(card) }));
  }

  public markStudyCardCorrect(card: Card | string) {
    this.store.dispatch(
      studyActions.markCardCorrect({ card: this.getId(card) })
    );
  }

  public markStudyCardWrong(card: Card | string) {
    this.store.dispatch(studyActions.markCardWrong({ card: this.getId(card) }));
  }
}
