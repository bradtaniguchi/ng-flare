import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app-state';
import { DeckService } from '../../core/services/deck/deck.service';
import { DeckFacadeService } from './deck-facade.service';
import {
  DeckActionTypes,
  ListGroupDecksUpdate,
  ListGroupDecksFailed,
  CreateDeck,
  CreateDeckSuccess,
  CreateDeckFailed
} from './deck.actions';
import {
  withLatestFrom,
  switchMap,
  map,
  catchError,
  takeUntil,
  mergeMap
} from 'rxjs/operators';
import { GroupFacadeService } from '../group/group-facade.service';
import { Injectable } from '@angular/core';
import { logger } from '../../core/logger';
import { of } from 'rxjs';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { AuthFacadeService } from '../auth/auth-facade.service';

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
