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
import { GroupService } from '../../core/services/group/group.service';
import { AppState } from '../app-state';
import { AuthFacadeService } from '../auth/auth-facade.service';
import { AuthActionTypes, AuthStateChange } from '../auth/auth.actions';
import { GroupFacadeService } from './group.facade';
import { groupActions } from './group.actions';

@Injectable({
  providedIn: 'root'
})
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService,
    private authFacade: AuthFacadeService,
    private groupService: GroupService
  ) {}

  private user$ = this.store.pipe(select(this.authFacade.getUserState));
  // private listStop$ = this.actions$.pipe(
  //   ofType(groupActions.)
  // );
  @Effect()
  setDefaultGroup$ = this.actions$.pipe(
    ofType(AuthActionTypes.STATE_CHANGE),
    mergeMap((action: AuthStateChange) =>
      action.payload.user && action.payload.user.uid
        ? [
            groupActions.select({
              groupId: action.payload.user.uid
            }),
            groupActions.searchUserGroups({ callNum: 0 }) // TODO!
          ]
        : [
            groupActions.select({
              groupId: action.payload.user.uid
            })
          ]
    )
  );

  @Effect()
  searchUserGroups$ = this.actions$.pipe(
    ofType(groupActions.searchUserGroups),
    withLatestFrom(this.user$),
    switchMap(([action, user]) =>
      this.groupService.getPermissions({ user }).pipe(
        switchMap(permissions =>
          this.groupService.listUserGroups({
            permissions
          })
        ),
        // map(groups => new ListUserGroupsUpdate({ groups })),
        map(groups => groupActions.searchUserGroupsUpdate({ groups })),
        catchError(err => {
          logger.error(err);
          return of(groupActions.searchUserGroupsFailed(action));
        })
        // TODO: re-add take-until later!
        // takeUntil(this.listStop$)
      )
    )
  );
}
