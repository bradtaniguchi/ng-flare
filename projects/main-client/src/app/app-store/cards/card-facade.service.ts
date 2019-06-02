import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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
  public getDecks = this.searchParamsService.createEntitiesSelector(
    state => state.card.ids,
    state => state.card.entities
  );
  public getOrderBy = this.searchParamsService.createOrderBySelector<Card>(
    state => state.card.orderBy
  );
  public getLimit = this.searchParamsService.createLimitSelector(
    state => state.card.limit
  );

  constructor(
    private store: Store<AppState>,
    private searchParamsService: SearchParamsService
  ) {}

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
