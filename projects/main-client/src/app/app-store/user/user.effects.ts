import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../../core/services/user/user.service';
import { userActions } from './user.actions';
import { mergeMap, map, catchError, takeUntil, filter } from 'rxjs/operators';
import { ReportError } from '../error/error.actions';
import { Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  get$ = this.actions$.pipe(
    ofType(userActions.get),
    mergeMap(action =>
      this.userService.get(action.key).pipe(
        map(entity =>
          entity
            ? userActions.getUpdate({ entity })
            : userActions.getFailed(action)
        ),
        catchError(err => [
          userActions.getFailed(action),
          new ReportError({
            message: 'There was an error getting user',
            err
          }),
          takeUntil(this.getUntil(action))
        ])
      )
    )
  );

  /**
   * Emits when a failure occurs for the given error OR
   * if the "stop" action is triggered
   */
  private getUntil(action: { key: string }): Observable<any> {
    const hasKey = filter(({ key }) => key === action.key);
    const fail$ = this.actions$.pipe(
      ofType(userActions.getFailed),
      hasKey
    );
    const stop$ = this.actions$.pipe(
      ofType(userActions.getStop),
      hasKey
    );
    return combineLatest([fail$, stop$]);
  }
}
