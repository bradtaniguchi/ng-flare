import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  DashboardActionTypes,
  DashboardDecksUpdate,
  GetDashboardDecks,
  GetDashboardDecksFailed
} from './dashboard.actions';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { DeckService } from '../../../core/services/deck/deck.service';
import { logger } from '../../../core/logger';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardEffects {
  constructor(private actions$: Actions, private deckService: DeckService) {}

  private getStop$ = this.actions$.pipe(ofType(DashboardActionTypes.GET_STOP));

  @Effect()
  getDecks$ = this.actions$.pipe(
    ofType(DashboardActionTypes.GET_DECKS),
    switchMap((action: GetDashboardDecks) =>
      this.deckService
        .list({
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
