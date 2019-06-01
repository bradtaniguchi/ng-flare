import { Injectable } from '@angular/core';
import { SearchParamsService } from '../../core/services/search-params/search-params.service';
import { AppState } from '../app-state';
import { createSelector, Store } from '@ngrx/store';
import { Deck } from '../../models/deck';
import { SearchParams } from '../../models/search-params';
import { ListGroupDecks, CreateDeck, ListGroupDecksStop } from './deck.actions';

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
  public getOrderBy = this.searchParamsService.createOrderBySelector<Deck>(
    state => state.deck.orderBy
  );
  public getLimit = this.searchParamsService.createLimitSelector(
    state => state.deck.limit
  );

  constructor(
    private store: Store<AppState>,
    private searchParamsService: SearchParamsService
  ) {}

  public getDeckSelector(deckId: string) {
    return createSelector(
      (state: AppState) => state.deck.entities[deckId],
      _ => _
    );
  }

  public listGroupDecks(params: Partial<SearchParams<Deck>>) {
    this.store.dispatch(new ListGroupDecks(params));
  }

  public createDeck(deck: Partial<Deck>) {
    this.store.dispatch(new CreateDeck({ deck }));
  }

  public stopList() {
    this.store.dispatch(new ListGroupDecksStop());
  }
}