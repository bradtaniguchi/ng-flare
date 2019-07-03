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

  // public searchDecks(params: SearchParams<Deck>) {
  //   return createSelector((state: AppState) => state.deck.entities, decks => Object.values(decks).sort((a, b) => a))
  // }

  public listGroupDecks(params: Partial<SearchParams<Deck>>) {
    // this.store.dispatch(new ListGroupDecks(params));
    this.store.dispatch(deckActions.search(params));
  }

  public createDeck(deck: Partial<Deck>) {
    // this.store.dispatch(new CreateDeck({ deck }));
    this.store.dispatch(deckActions.create({ entity: deck }));
  }

  public createDeckWithCards(params: {
    deck: Partial<Deck>;
    cards: Array<Partial<Card>>;
  }) {
    // this.store.dispatch(new CreateDeckWithCards(params));
    this.store.dispatch(deckActions.createWithCards(params));
  }

  public stopList(params: { callNum: number }) {
    // this.store.dispatch(new ListGroupDecksStop());
    this.store.dispatch(deckActions.searchStop(params));
  }
}
