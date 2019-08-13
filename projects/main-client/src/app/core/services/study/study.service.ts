import { Injectable } from '@angular/core';
import { StudyState } from '../../../modules/study/store/study.state';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  constructor() {}

  /**
   * Returns all previously studied cards
   */
  public getPrevious<T>(params: {
    wrong?: T[];
    correct?: T[];
    skipped?: T[];
  }): T[] {
    const { wrong, correct, skipped } = params;
    return [...(wrong || []), ...(correct || []), ...(skipped || [])];
  }

  /**
   * Returns the percentage of completed cards out of the deck
   */
  public getCompletedPercentage<T>(params: {
    cards: T[];
    wrong: T[];
    correct: T[];
    skipped: T[];
  }): number {
    const { cards } = params;
    const previous = this.getPrevious(params).length;
    const total = (cards || []).length;
    return Math.floor((previous / total) * 100);
  }

  /**
   * Utility function that returns the next card to show from the state.
   * It will randomly select
   * @param state the state we are to calculate the next card from
   */
  public getNextCard<T>(state: {
    cards?: T[];
    wrong?: T[];
    correct?: T[];
    skipped?: T[];
  }): T | undefined {
    const { cards } = state;
    if (cards.length === 0) {
      return undefined;
    }
    const previous = this.getPrevious(state);
    if (previous.length >= cards.length) {
      return undefined;
    }
    const cardsToStudy = cards.filter(card => !previous.includes(card));
    const randomIndex = this.getRandom(cardsToStudy.length);
    return cardsToStudy[randomIndex];
  }

  private getRandom(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
