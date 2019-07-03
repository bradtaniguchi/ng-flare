import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Deck } from '../../../models/deck';
import { Collections } from '../../collections';
import { Observable, from } from 'rxjs';
import { Group } from '../../../models/group';
import { mapTo, take } from 'rxjs/operators';
import { User } from '../../../models/user';
import { SearchParams } from '../../../models/search-params';
import { SearchFilterService } from '../search-filter/search-filter.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deckCollection: AngularFirestoreCollection<Deck>;
  constructor(
    private db: AngularFirestore,
    private searchFilterService: SearchFilterService
  ) {
    this.deckCollection = this.db.collection(Collections.Decks);
  }

  /**
   * Creates a new deck
   */
  public create(params: {
    deck: Partial<Deck>;
    /**
     * The group the deck goes to
     */
    group: Group;
    /**
     * The user creating the deck
     */
    user: User;
  }): Observable<Deck> {
    const { deck, group, user } = params;
    const uid = this.db.createId();
    const createdDeck = {
      uid,
      createdBy: user.uid,
      group: group.uid,
      ...deck,
      createdOn: new Date()
    } as Deck;
    return from(this.deckCollection.doc(uid).set(createdDeck)).pipe(
      mapTo(createdDeck)
    );
  }

  public search(params: SearchParams<Deck>): Observable<Deck[]> {
    const { filters, limit, orderBy } = params;
    return this.db
      .collection<Deck>(Collections.Cards, ref =>
        this.searchFilterService
          .applyFilters<Deck>({
            filters,
            ref
          })
          .orderBy(orderBy)
          .limit(limit)
      )
      .valueChanges();
  }

  /**
   * Returns the deck with the given id
   */
  public get(params: { deckId: string; takeOne: boolean }): Observable<Deck> {
    const { deckId, takeOne } = params;
    return takeOne
      ? this.deckCollection
          .doc<Deck>(deckId)
          .valueChanges()
          .pipe(take(1))
      : this.deckCollection.doc<Deck>(deckId).valueChanges();
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
