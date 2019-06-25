import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';
import { CardService } from '../../core/services/card/card.service';
import { Card } from '../../models/card';
import { User } from '../../models/user';
import { AppState } from '../app-state';
import { AuthFacadeService } from '../auth/auth-facade.service';
import { ReportError } from '../error/error.actions';
import {
  CardActionTypes,
  CreateCards,
  CreateCardsFailed,
  CreateCardsSuccess,
  ListDeckCards,
  ListDeckCardsFailed,
  ListDeckCardsUpdate
} from './card.actions';
import { CardFacadeService } from './card.facade';

@Injectable({
  providedIn: 'root'
})
export class CardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cardService: CardService,
    private cardFacadeService: CardFacadeService,
    private authFacadeService: AuthFacadeService
  ) {}

  private user$ = this.store.pipe(select(this.authFacadeService.getUserState));
  private listStop$ = this.actions$.pipe(
    ofType(CardActionTypes.LIST_DECK_CARDS_STOP)
  );
  @Effect()
  createCards$ = this.actions$.pipe(
    ofType(CardActionTypes.CREATE),
    withLatestFrom(this.user$),
    mergeMap(([action, user]: [CreateCards, User]) =>
      this.cardService
        .create({
          cards: action.payload.cards,
          deck: action.payload.deck,
          user
        })
        .pipe(
          map(
            cards =>
              new CreateCardsSuccess({
                cards
              })
          ),
          catchError(err =>
            of([
              new CreateCardsFailed(),
              new ReportError({
                err,
                message: 'There was an error creating cards'
              })
            ])
          )
        )
    )
  );

  @Effect()
  listDeckCards$ = this.actions$.pipe(
    ofType(CardActionTypes.LIST_DECK_CARDS),
    switchMap((action: ListDeckCards) =>
      this.cardService
        .list({
          deck: action.payload.deck,
          limit: action.payload.limit,
          orderBy: action.payload.orderBy
        })
        .pipe(
          map(cards => new ListDeckCardsUpdate({ cards })),
          catchError(err =>
            of([
              new ListDeckCardsFailed(),
              new ReportError({
                err,
                message: 'There was an error getting cards for deck'
              })
            ])
          ),
          takeUntil(this.listStop$)
        )
    )
  );
}
