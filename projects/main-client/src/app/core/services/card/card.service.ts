import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { forkJoin, from, Observable } from 'rxjs';
import { mapTo, tap, catchError } from 'rxjs/operators';
import { Card } from '../../../models/card';
import { User } from '../../../models/user';
import { Collections } from '../../collections';
import { Deck } from '../../../models/deck';
import { logger } from '../../logger';
import { SearchParams } from '../../../models/search-params';
import { SearchFilterService } from '../search-filter/search-filter.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardCollection: AngularFirestoreCollection<Card>;
  constructor(
    private db: AngularFirestore,
    private searchFilterService: SearchFilterService
  ) {
    this.cardCollection = this.db.collection(Collections.Cards);
  }

  /**
   * Creates multiple cards
   */
  public create(params: {
    cards: Array<Partial<Card>>;
    deck: Deck;
    user: User;
  }): Observable<Card[]> {
    const { cards, deck, user } = params;
    const cardsCreated: Card[] = cards.map(
      card =>
        ({
          ...card,
          group: deck.group,
          deck: deck.uid,
          uid: this.db.createId(),
          createdOn: new Date(),
          createdBy: user.uid
        } as Card)
    );
    logger.log('cards created', { cards, cardsCreated });
    return forkJoin(
      cardsCreated.map(card =>
        from(this.cardCollection.doc(card.uid).set(card)).pipe(
          catchError(err => {
            // TODO: handle more gracefully
            logger.error(err);
            return null;
          })
        )
      )
    ).pipe(mapTo(cardsCreated));
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

  /**
   * Returns a list of cards for the given deck
   */
  public list(params: {
    deck: Deck;
    orderBy: keyof Card;
    limit: number;
  }): Observable<Card[]> {
    const { deck, orderBy, limit } = params;
    return this.db
      .collection<Card>(Collections.Cards, ref =>
        ref
          .where('group', '==', deck.uid)
          .orderBy(orderBy)
          .limit(limit)
      )
      .valueChanges();
  }

  public search(params: SearchParams<Card>): Observable<Card[]> {
    const { filters, limit, orderBy } = params;
    return this.db
      .collection<Card>(Collections.Cards, ref =>
        this.searchFilterService
          .applyFilters<Card>({
            filters,
            ref
          })
          .orderBy(orderBy)
          .limit(limit)
      )
      .valueChanges();
  }
}
