import { Injectable } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { DashboardState } from './dashboard.state';
import { GetDashboardDecks } from './dashboard.actions';
import { SearchParamsService } from '../../../core/services/search-params/search-params.service';
import { Deck } from '../../../models/deck';
import { SearchParams } from '../../../models/search-params';

@Injectable({
  providedIn: 'root'
})
export class DashboardFacadeService {
  public getLoading = this.searchParamsService.createLoadingSelector(
    state => state.dashboard.loading
  );
  public getDecks = this.searchParamsService.createEntitiesSelector<Deck>(
    state => state.dashboard.ids,
    state => state.dashboard.entities
  );
  public getOrderBy = this.searchParamsService.createOrderBySelector<Deck>(
    state => state.dashboard.orderBy
  );
  public getLimit = this.searchParamsService.createLimitSelector(
    state => state.dashboard.limit
  );

  constructor(
    private store: Store<AppState>,
    private searchParamsService: SearchParamsService
  ) {}

  public getDeckSelector(deckId: string) {
    return createSelector(
      (state: AppState) => state.dashboard.entities[deckId],
      _ => _
    );
  }

  public getDashboardDecks(params: Partial<SearchParams<Deck>>) {
    this.store.dispatch(new GetDashboardDecks(params));
  }
}
