import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { DontUseLoading, UseLoading } from './loading.actions';

@Injectable({
  providedIn: 'root'
})
export class LoadingFacadeService {
  public getLoadingState$ = createSelector(
    (state: AppState) => state,
    state => state.loading
  );
  public getUseLoading = createSelector(
    (state: AppState) => state.loading.useLoading,
    _ => _
  );

  /**
   * Returns if we are to show the loading bar, if any part of the core state
   * properties has "loading"
   */
  public getLoading = createSelector(
    (state: AppState) => state.loading.useLoading,
    (state: AppState) => state.route.loading,
    (state: AppState) => state.card.loading,
    (state: AppState) => state.deck.loading,
    (state: AppState) => state.group.loading,
    (useLoading, routeLoading, cardLoading, deckLoading, groupLoading) =>
      useLoading && (routeLoading || cardLoading || deckLoading || groupLoading)
  );

  constructor(private store: Store<AppState>) {}

  public useLoading() {
    this.store.dispatch(new UseLoading());
  }

  public dontUseLoading() {
    this.store.dispatch(new DontUseLoading());
  }
}
