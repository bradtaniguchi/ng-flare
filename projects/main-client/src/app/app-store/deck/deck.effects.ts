import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  map,
  mergeMap,
  withLatestFrom,
  takeUntil
} from 'rxjs/operators';
import { DeckService } from '../../core/services/deck/deck.service';
import { AppState } from '../app-state';
import { AuthFacadeService } from '../auth/auth-facade.service';
import { cardActions } from '../cards/card.actions';
import { ReportError } from '../error/error.actions';
import { GroupFacadeService } from '../group/group.facade';
import { deckActions } from './deck.actions';
import { CallNumService } from '../../core/services/call-num/call-num.service';

@Injectable({
  providedIn: 'root'
})
export class DeckEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private deckService: DeckService,
    private callNumService: CallNumService,
    private groupFacadeService: GroupFacadeService,
    private authFacadeService: AuthFacadeService
  ) {}

  private group$ = this.store.pipe(select(this.groupFacadeService.getSelected));

  // private listStop$ = this.actions$.pipe(
  //   ofType(DeckActionTypes.LIST_GROUP_DECKS_STOP)
  // );
  private user$ = this.store.pipe(select(this.authFacadeService.getUserState));

  @Effect()
  createDeck$ = this.actions$.pipe(
    ofType(deckActions.create),
    withLatestFrom(this.group$, this.user$),
    mergeMap(([action, group, user]) =>
      this.deckService
        .create({
          deck: action.entity,
          group,
          user
        })
        .pipe(
          map(entity => deckActions.createSuccess({ entity })),
          catchError(err => [deckActions.createFailed(action)])
        )
    )
  );

  @Effect()
  getDeck$ = this.actions$.pipe(
    ofType(deckActions.get),
    mergeMap(action =>
      this.deckService
        .get({
          deckId: action.key
        })
        .pipe(
          map(entity => deckActions.getUpdate({ entity })),
          catchError(err => [
            deckActions.getFailed(action),
            new ReportError({
              err,
              message: 'There was an error getting deck'
            })
          ]),
          takeUntil(this.callNumService.takeUntil(action))
        )
    )
  );

  @Effect()
  createDeckAndCards$ = this.actions$.pipe(
    ofType(deckActions.createWithCards),
    withLatestFrom(this.group$, this.user$),
    mergeMap(([action, group, user]) =>
      this.deckService
        .create({
          deck: action.deck,
          group,
          user
        })
        .pipe(
          mergeMap(entity => [
            deckActions.createSuccess({ entity }),
            cardActions.createWithDeck({
              cards: action.cards,
              deck: entity
            })
          ]),
          catchError(err => [
            deckActions.createFailed({ entity: action.deck }),
            new ReportError({
              err,
              message: 'There was an error creating deck'
            })
          ])
        )
    )
  );

  @Effect()
  searchDecks$ = this.actions$.pipe(
    ofType(deckActions.search),
    mergeMap(action =>
      this.deckService.search(action).pipe(
        map(entities => deckActions.searchUpdate({ entities })),
        catchError(err => [
          deckActions.searchFailed({ callNum: action.callNum }),
          new ReportError({
            err,
            message: 'There was an error searching decks'
          })
        ])
      )
    )
  );
  // @Effect()
  // listGroupDecks$ = this.actions$.pipe(
  //   ofType(deckActions.search),
  //   withLatestFrom(this.group$),
  //   switchMap(([action, group]: [ListGroupDecks, Group]) =>
  //     this.deckService
  //       .list({
  //         group,
  //         orderBy: action.payload.orderBy,
  //         limit: action.payload.limit
  //       })
  //       .pipe(
  //         map(decks => new ListGroupDecksUpdate({ decks })),
  //         catchError(err => {
  //           logger.error(err);
  //           return of(new ListGroupDecksFailed());
  //         }),
  //         takeUntil(this.listStop$)
  //       )
  //   )
  // );
}
