import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { forkJoin, from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Card } from '../../../models/card';
import { User } from '../../../models/user';
import { Collections } from '../../collections';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardCollection: AngularFirestoreCollection<Card>;
  constructor(private db: AngularFirestore) {
    this.cardCollection = this.db.collection(Collections.Cards);
  }

  /**
   * Creates multiple cards
   */
  public create(params: {
    cards: Array<Partial<Card>>;
    user: User;
  }): Observable<void> {
    const { cards, user } = params;
    return forkJoin(
      cards
        .map(card => ({
          ...card,
          uid: this.db.createId(),
          createdOn: new Date(),
          createdBy: user.uid
        }))
        .map(card => from(this.cardCollection.doc(card.uid).set(card)))
    ).pipe(mapTo(undefined));
  }

  /**
   * Updates the given cards
   */
  public update(params: {
    cards: Array<Partial<Card>>;
    user: User;
  }): Observable<void> {
    const { cards, user } = params;
    return forkJoin(
      cards
        .map(card => ({ ...card, updatedOn: new Date(), updatedBy: user.uid }))
        .map(card => from(this.cardCollection.doc(card.uid).update(card)))
    ).pipe(mapTo(undefined));
  }

  /**
   * Removes the given cards
   */
  public remove(params: { cards: Array<Partial<Card>> }): Observable<void> {
    const { cards } = params;
    return forkJoin(
      cards.map(card => from(this.cardCollection.doc(card.uid).delete()))
    ).pipe(mapTo(undefined));
  }
}
