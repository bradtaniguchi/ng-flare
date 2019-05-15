import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  CollectionReference
} from '@angular/fire/firestore';
import { Card } from '../../../models/card';
import { Collections } from '../../collections';
import { Observable, from, of } from 'rxjs';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardCollectionRef: CollectionReference;
  constructor(private db: AngularFirestore) {
    this.cardCollectionRef = this.db.firestore.collection(Collections.Cards);
  }

  /**
   * Creates multiple cards
   */
  public create(params: {
    cards: Array<Partial<Card>>;
    user: User;
  }): Observable<void> {
    const { cards, user } = params;
    const finalBatch = cards
      .map(card => ({
        ...card,
        uid: this.db.createId(),
        createdOn: new Date(),
        createdBy: user.uid
      }))
      .reduce(
        (batch, card) => batch.set(this.cardCollectionRef.doc(card.uid), card),
        this.db.firestore.batch()
      );
    return from(finalBatch.commit());
  }

  /**
   * Updates the given cards
   */
  public update(params: {
    cards: Array<Partial<Card>>;
    user: User;
  }): Observable<void> {
    const { cards, user } = params;
    const finalBatch = cards
      .map(card => ({ ...card, updatedOn: new Date(), updatedBy: user.uid }))
      .reduce(
        (batch, card) =>
          batch.update(this.cardCollectionRef.doc(card.uid), card),
        this.db.firestore.batch()
      );
    return from(finalBatch.commit());
  }

  /**
   * Removes the given cards
   */
  public remove(params: {
    cards: Array<Partial<Card>>;
    user: User;
  }): Observable<void> {
    const { cards, user } = params;
    const finalBatch = cards.reduce(
      (batch, card) => batch.delete(this.cardCollectionRef.doc(card.uid)),
      this.db.firestore.batch()
    );
    return from(finalBatch.commit());
  }
}
