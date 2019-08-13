import { Injectable } from '@angular/core';
import { SearchParamsService } from '../../core/services/search-params/search-params.service';
import { AppState } from '../app-state';
import { createSelector, Store } from '@ngrx/store';
import { Deck } from '../../models/deck';
import { SearchParams } from '../../models/search-params';
import { Card } from '../../models/card';
import { deckActions } from './deck.actions';

@Injectable({
  providedIn: 'root'
})
export class DeckFacadeService {
  public getLoading = this.searchParamsService.createLoadingSelector(
    state => state.deck.loading
  );
  public getDecks = this.searchParamsService.createEntitiesSelector(
    state => state.deck.ids,
    state => state.deck.entities
  );

  public getDecksByGroup = createSelector(
    this.getDecks,
    (decks: Deck[], props: { groupId: string }) =>
      decks.filter(deck => deck.group === props.groupId)
  );

  constructor(
    private store: Store<AppState>,
    private searchParamsService: SearchParamsService
  ) {}

  public getDeckSelector(deckId: string) {
    return createSelector(
      (state: AppState) => state.deck.entities,
      decks => decks[deckId]
    );
  }

  public getDeck(params: { key: string; callNum: number }) {
    this.store.dispatch(deckActions.get(params));
  }

  public listGroupDecks(params: Partial<SearchParams<Deck>>) {
    this.store.dispatch(deckActions.search(params));
  }

  public createDeck(deck: Partial<Deck>) {
    this.store.dispatch(deckActions.create({ entity: deck }));
  }

  public createDeckWithCards(params: {
    deck: Partial<Deck>;
    cards: Array<Partial<Card>>;
  }) {
    this.store.dispatch(deckActions.createWithCards(params));
  }

  public stopList(params: { callNum: number }) {
    this.store.dispatch(deckActions.searchStop(params));
  }
}
