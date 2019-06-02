import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app-state';
import { CardService } from '../../core/services/card/card.service';
import {
  CardActionTypes,
  CreateCards,
  ListDeckCards,
  ListDeckCardsUpdate,
  ListDeckCardsFailed,
  CreateCardsSuccess,
  CreateCardsFailed
} from './card.actions';
import {
  withLatestFrom,
  mergeMap,
  switchMap,
  takeUntil,
  map,
  catchError
} from 'rxjs/operators';
import { AuthFacadeService } from '../auth/auth-facade.service';
import { User } from '../../models/user';
import { CardFacadeService } from './card-facade.service';
import { Card } from '../../models/card';
import { logger } from '../../core/logger';
import { of } from 'rxjs';

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

  private limit$ = this.store.pipe(select(this.cardFacadeService.getLimit));
  private orderBy$ = this.store.pipe(select(this.cardFacadeService.getOrderBy));
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
          catchError(err => {
            logger.error(err);
            return of(new CreateCardsFailed());
          })
        )
    )
  );

  @Effect()
  listDeckCards$ = this.actions$.pipe(
    ofType(CardActionTypes.LIST_DECK_CARDS),
    withLatestFrom(this.orderBy$, this.limit$),
    switchMap(([action, orderBy, limit]: [ListDeckCards, keyof Card, number]) =>
      this.cardService
        .list({
          deck: action.payload.deck,
          limit,
          orderBy
        })
        .pipe(
          map(cards => new ListDeckCardsUpdate({ cards })),
          catchError(err => {
            logger.error(err);
            return of(new ListDeckCardsFailed());
          }),
          takeUntil(this.listStop$)
        )
    )
  );
}
