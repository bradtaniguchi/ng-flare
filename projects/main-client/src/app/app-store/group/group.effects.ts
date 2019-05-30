import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app-state';
import { Injectable } from '@angular/core';
import { GroupFacadeService } from './group-facade.service';
import {
  GroupActionTypes,
  SetSelectedGroup,
  ListUserGroups,
  ListUserGroupsFailed,
  ListUserGroupsUpdate
} from './group.actions';
import { AuthActionTypes, AuthStateChange } from '../auth/auth.actions';
import {
  map,
  filter,
  switchMap,
  withLatestFrom,
  catchError,
  takeUntil,
  mergeMap
} from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { GroupService } from '../../core/services/group/group.service';
import { AuthFacadeService } from '../auth/auth-facade.service';
import { logger } from '../../core/logger';

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
  private listStop$ = this.actions$.pipe(
    ofType(GroupActionTypes.LIST_USER_GROUPS_STOP)
  );
  @Effect()
  setDefaultGroup$ = this.actions$.pipe(
    ofType(AuthActionTypes.STATE_CHANGE),
    mergeMap((action: AuthStateChange) =>
      action.payload.user && action.payload.user.uid
        ? [
            new SetSelectedGroup({
              group: action.payload.user.uid
            }),
            new ListUserGroups()
          ]
        : [
            new SetSelectedGroup({
              group: undefined
            })
          ]
    )
  );

  @Effect()
  listUserGroups$ = this.actions$.pipe(
    ofType(GroupActionTypes.LIST_USER_GROUPS),
    withLatestFrom(this.user$),
    switchMap(([_, user]) =>
      this.groupService.getPermissions({ user }).pipe(
        switchMap(permissions =>
          this.groupService.listUserGroups({
            permissions
          })
        ),
        map(groups => new ListUserGroupsUpdate({ groups })),
        catchError(err => {
          logger.error(err);
          return of(new ListUserGroupsFailed());
        }),
        takeUntil(this.listStop$)
      )
    )
  );
}
