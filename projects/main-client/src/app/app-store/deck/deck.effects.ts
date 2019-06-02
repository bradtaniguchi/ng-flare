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
import { logger } from '../../core/logger';
import { DeckService } from '../../core/services/deck/deck.service';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { AppState } from '../app-state';
import { AuthFacadeService } from '../auth/auth-facade.service';
import { GroupFacadeService } from '../group/group-facade.service';
import {
  CreateDeck,
  CreateDeckFailed,
  CreateDeckSuccess,
  DeckActionTypes,
  ListGroupDecksFailed,
  ListGroupDecksUpdate,
  CreateDeckWithCards
} from './deck.actions';
import { CreateCards } from '../cards/card.actions';

@Injectable({
  providedIn: 'root'
})
export class DeckEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private deckService: DeckService,
    private groupFacadeService: GroupFacadeService,
    private authFacadeService: AuthFacadeService
  ) {}

  private group$ = this.store.pipe(select(this.groupFacadeService.getSelected));
  private orderBy$ = this.store.pipe(
    select(this.groupFacadeService.getOrderBy)
  );
  private getLimit$ = this.store.pipe(select(this.groupFacadeService.getLimit));
  private listStop$ = this.actions$.pipe(
    ofType(DeckActionTypes.LIST_GROUP_DECKS_STOP)
  );
  private user$ = this.store.pipe(select(this.authFacadeService.getUserState));

  @Effect()
  createDeck$ = this.actions$.pipe(
    ofType(DeckActionTypes.CREATE),
    withLatestFrom(this.group$, this.user$),
    mergeMap(([action, group, user]: [CreateDeck, Group, User]) =>
      this.deckService
        .create({
          deck: action.payload.deck,
          group,
          user
        })
        .pipe(
          map(deck => new CreateDeckSuccess({ deck })),
          catchError(err => {
            logger.error(err);
            return of(new CreateDeckFailed());
          })
        )
    )
  );

  @Effect()
  createDeckAndCards$ = this.actions$.pipe(
    ofType(DeckActionTypes.CREATE_WITH_CARDS),
    withLatestFrom(this.group$, this.user$),
    mergeMap(([action, group, user]: [CreateDeckWithCards, Group, User]) =>
      this.deckService
        .create({
          deck: action.payload.deck,
          group,
          user
        })
        .pipe(
          mergeMap(deck => [
            new CreateDeckSuccess({ deck }),
            new CreateCards({ cards: action.payload.cards, deck })
          ]),
          catchError(err => {
            logger.error(err);
            return of(new CreateDeckFailed());
          })
        )
    )
  );

  @Effect()
  listGroupDecks$ = this.actions$.pipe(
    ofType(DeckActionTypes.LIST_GROUP_DECKS),
    withLatestFrom(this.group$, this.orderBy$, this.getLimit$),
    switchMap(([_, group, orderBy, limit]) =>
      this.deckService
        .list({
          group,
          orderBy,
          limit
        })
        .pipe(
          map(decks => new ListGroupDecksUpdate({ decks })),
          catchError(err => {
            logger.error(err);
            return of(new ListGroupDecksFailed());
          }),
          takeUntil(this.listStop$)
        )
    )
  );
}
