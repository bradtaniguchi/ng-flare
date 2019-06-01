import { Injectable } from '@angular/core';
import { Card } from '../../../models/card';
import { StudyState } from '../../../modules/study/store/study.state';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  constructor() {}

  /**
   * Returns all previously studied cards
   */
  public getPrevious(params: {
    missed?: string[];
    correct?: string[];
    skipped?: string[];
  }): string[] {
    const { missed, correct, skipped } = params;
    return [...(missed || []), ...(correct || []), ...(skipped || [])];
  }
  /**
   * Utility function that returns the next card to show from the state.
   * It will randomly select
   * @param state the state we are to calculate the next card from
   */
  public getNextCard(state: StudyState): Card | undefined {
    const { cards } = state;
    if (cards.length === 0) {
      return undefined;
    }
    const previous = this.getPrevious(state);
    if (previous.length >= cards.length) {
      return undefined;
    }
    const cardsToStudy = cards.filter(card => !previous.includes(card.uid));
    const randomIndex = this.getRandom(cardsToStudy.length);
    return cardsToStudy[randomIndex];
  }

  private getRandom(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
