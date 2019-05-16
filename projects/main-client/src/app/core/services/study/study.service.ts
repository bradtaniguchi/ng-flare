import { Injectable } from '@angular/core';
import { Card } from '../../../models/card';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  constructor() {}
  /**
   * Utility function that returns the next card to show from the state.
   * It will randomly select
   * @param state the state we are to calculate the next card from
   */
  public getNextCard(state: any): Card | undefined {
    const { cards, missed, skipped, correct, previous } = state;
    if (cards.length === 0) {
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
