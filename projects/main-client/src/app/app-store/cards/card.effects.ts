import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { CardService } from '../../core/services/card/card.service';
import { AppState } from '../app-state';
import { AuthFacadeService } from '../auth/auth-facade.service';
import { ReportError } from '../error/error.actions';
import { cardActions } from './card.actions';

@Injectable({
  providedIn: 'root'
})
export class CardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cardService: CardService,
    private authFacadeService: AuthFacadeService
  ) {}

  private user$ = this.store.pipe(select(this.authFacadeService.getUserState));
  // private listStop$ = this.actions$.pipe(
  //   ofType(CardActionTypes.LIST_DECK_CARDS_STOP)
  // );
  @Effect()
  createCards$ = this.actions$.pipe(
    ofType(cardActions.createWithDeck),
    withLatestFrom(this.user$),
    mergeMap(([action, user]) =>
      this.cardService
        .create({
          ...action,
          user
        })
        .pipe(
          map(entities => cardActions.createWithDeckSuccess({ entities })),
          catchError(err => [
            cardActions.createWithDeckFailed(action),
            new ReportError({
              err,
              message: 'There was an error creating cards'
            })
          ])
        )
    )
  );

  @Effect()
  searchCards$ = this.actions$.pipe(
    ofType(cardActions.search),
    switchMap(action =>
      this.cardService.search(action).pipe(
        map(entities => cardActions.searchUpdate({ entities })),
        catchError(err => [
          cardActions.searchFailed({ callNum: action.callNum }),
          new ReportError({
            err,
            message: 'There was an error searching cards'
          })
        ])
      )
    )
  );
}
