import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudyState } from './study.state';
import { AppState } from '../../../app-store/app-state';
import { DateTime, Duration } from 'luxon';

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
  public getPrevious = createSelector(
    this.studyState,
    state => state.previous
  );
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

  constructor() {}

  /**
   * Returns the duration from the start date
   */
  private getDurationFromStart(start: Date): Duration {
    return DateTime.fromJSDate(start).diffNow();
  }
}
