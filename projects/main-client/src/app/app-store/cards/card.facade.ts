import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { SearchParamsService } from '../../core/services/search-params/search-params.service';
import { Card } from '../../models/card';
import { Deck } from '../../models/deck';
import { AppState } from '../app-state';
import { cardActions } from './card.actions';
import { SearchParams } from '../../models/search-params';

@Injectable({
  providedIn: 'root'
})
export class CardFacadeService {
  public getLoading = this.searchParamsService.createLoadingSelector(
    state => state.card.loading
  );
  public getCards = this.searchParamsService.createEntitiesSelector(
    state => state.card.ids,
    state => state.card.entities
  );

  constructor(
    private store: Store<AppState>,
    private searchParamsService: SearchParamsService
  ) {}

  public getCardsByDeck(deckId: string) {
    return createSelector(
      this.getCards,
      (cards: Card[]) => cards.filter(card => card.deck === deckId)
    );
  }

  public getCardsByGroup(groupId: string) {
    return createSelector(
      this.getCards,
      (cards: Card[]) => cards.filter(card => card.group === groupId)
    );
  }

  public listCards(params?: SearchParams<Card>) {
    this.store.dispatch(cardActions.search(params));
  }

  public createCard(params: { cards: Array<Partial<Card>>; deck: Deck }) {
    this.store.dispatch(cardActions.createWithDeck(params));
  }

  public stopList(params: { callNum: number }) {
    this.store.dispatch(cardActions.searchStop(params));
  }
}
