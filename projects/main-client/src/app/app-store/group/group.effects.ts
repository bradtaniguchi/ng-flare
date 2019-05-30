import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { Injectable } from '@angular/core';
import { GroupFacadeService } from './group-facade.service';
import { GroupActionTypes, SetSelectedGroup } from './group.actions';
import { AuthActionTypes, AuthStateChange } from '../auth/auth.actions';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService
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
}
