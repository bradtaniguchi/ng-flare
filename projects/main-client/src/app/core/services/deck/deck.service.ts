import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Deck } from '../../../models/deck';
import { Collections } from '../../collections';
import { Observable, from } from 'rxjs';
import { Group } from '../../../models/group';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deckCollection: AngularFirestoreCollection<Deck>;
  constructor(private db: AngularFirestore) {
    this.deckCollection = this.db.collection(Collections.Decks);
  }

  /**
   * Creates a new deck
   */
  public create(deck: Partial<Deck>): Observable<void> {
    const uid = this.db.createId();
    return from(
      this.deckCollection
        .doc(uid)
        .set({ uid, ...deck, createdOn: new Date() } as Deck)
    );
  }

  /**
   * Returns a list of all decks for the given group
   */
  public list(params: {
    group: Group;
    orderBy: string;
    limit: number;
  }): Observable<Deck[]> {
    const { group, orderBy, limit } = params;
    console.log('group list called', params);
    return this.db
      .collection<Deck>(Collections.Decks, ref =>
        ref
          .where('group', '==', group.uid)
          .orderBy(orderBy)
          .limit(limit)
      )
      .valueChanges();
  }

  /**
   * Updates the given deck
   */
  public update(deck: Partial<Deck>): Observable<void> {
    const { uid } = deck;
    return from(
      this.deckCollection.doc(uid).update({
        uid,
        ...deck,
        updatedOn: new Date()
      } as Partial<Deck>)
    );
  }
}
