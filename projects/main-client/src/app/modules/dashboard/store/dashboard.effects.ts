import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  DashboardActionTypes,
  DashboardDecksUpdate,
  GetDashboardDecks,
  GetDashboardDecksFailed
} from './dashboard.actions';
import {
  switchMap,
  map,
  catchError,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';
import { DeckService } from '../../../core/services/deck/deck.service';
import { logger } from '../../../core/logger';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { DashboardFacadeService } from './dashboard-facade.service';
import { Deck } from '../../../models/deck';

@Injectable({
  providedIn: 'root'
})
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dashboardFacade: DashboardFacadeService,
    private deckService: DeckService
  ) {}

  private getStop$ = this.actions$.pipe(ofType(DashboardActionTypes.GET_STOP));
  private getLimit$ = this.store.pipe(select(this.dashboardFacade.getLimit));
  private getOrderBy$ = this.store.pipe(
    select(this.dashboardFacade.getOrderBy)
  );
  @Effect()
  getDecks$ = this.actions$.pipe(
    ofType(DashboardActionTypes.GET_DECKS),
    withLatestFrom(this.getLimit$, this.getOrderBy$),
    switchMap(
      ([action, limit, orderBy]: [GetDashboardDecks, number, keyof Deck]) =>
        this.deckService
          .list({
            limit,
            orderBy,
            group: undefined as any,
            ...action.payload
          })
          .pipe(
            map(decks => new DashboardDecksUpdate({ decks })),
            catchError(err => {
              logger.error(err);
              return of(new GetDashboardDecksFailed());
            }),
            takeUntil(this.getStop$)
          )
    )
  );
}
