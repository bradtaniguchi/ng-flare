import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { Injectable } from '@angular/core';
import { GroupFacadeService } from './group-facade.service';
import {
  GroupActionTypes,
  SetSelectedGroup,
  ListUserGroups
} from './group.actions';
import { AuthActionTypes, AuthStateChange } from '../auth/auth.actions';
import { map, filter, switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { GroupService } from '../../core/services/group/group.service';

@Injectable({
  providedIn: 'root'
})
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService,
    private groupService: GroupService
  ) {}

  @Effect()
  setDefaultGroup$ = this.actions$.pipe(
    ofType(AuthActionTypes.STATE_CHANGE),
    map((action: AuthStateChange) =>
      action.payload.user && action.payload.user.uid
        ? new SetSelectedGroup({
            group: action.payload.user.uid
          })
        : new SetSelectedGroup({
            group: undefined
          })
    )
  );

  // @Effect()
  // listUserGroups$ = this.actions$.pipe(ofType(GroupActionTypes.LIST_USER_GROUPS),
  // switchMap(() => this.groupService.listUserGroups({
  //   permissions
  // }).pipe())
  // );

  // @Effect()
  // getGroupsOnStateChange$ = this.actions$.pipe(
  //   ofType(AuthActionTypes.STATE_CHANGE),
  //   map(_ => new GetGroups())
  // );
}
