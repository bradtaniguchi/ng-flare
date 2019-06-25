import { Injectable } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { SearchParamsService } from '../../core/services/search-params/search-params.service';
import { Card } from '../../models/card';
import { SearchParams } from '../../models/search-params';
import { AppState } from '../app-state';
import {
  CreateCards,
  ListDeckCards,
  ListDeckCardsStop,
  ListDeckCardsParams
} from './card.actions';
import { Deck } from '../../models/deck';

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

  public listCards(params?: ListDeckCardsParams) {
    this.store.dispatch(new ListDeckCards(params));
  }

  public createCard(params: { cards: Array<Partial<Card>>; deck: Deck }) {
    this.store.dispatch(new CreateCards(params));
  }

  public stopList() {
    this.store.dispatch(new ListDeckCardsStop());
  }
}
