import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { logger } from '../../core/logger';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserService } from '../../core/services/user/user.service';
import {
  AuthActionTypes,
  AuthLoginFailed,
  AuthLoginSuccess,
  AuthLogoutFailed,
  AuthLogoutSuccess,
  AuthRegister,
  AuthRegisterFailed,
  AuthRegisterOnlyUpdateSuccess,
  AuthRegisterSuccess
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private user: UserService
  ) {}

  /**
   * Fired when the user logs into the app, we try to
   * also register the user.
   */
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    mergeMap(() =>
      this.auth.googleLogin().pipe(
        mergeMap(userCredentials => [
          new AuthRegister({ user: userCredentials.user }),
          new AuthLoginSuccess({ user: userCredentials.user })
        ]),
        catchError(err => {
          logger.error(err);
          return of(new AuthLoginFailed(err));
        })
      )
    )
  );

  /**
   * Fired whenever a user is logged in, without ever logging in before.
   */
  @Effect()
  register$ = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER),
    mergeMap((action: AuthRegister) =>
      this.user.exists(action.payload.user).pipe(
        mergeMap<boolean, AuthRegisterOnlyUpdateSuccess | AuthRegisterSuccess>(
          exists =>
            exists
              ? this.user
                  .updateLogin(action.payload.user)
                  .pipe(map(() => new AuthRegisterOnlyUpdateSuccess()))
              : this.user
                  .create(action.payload.user)
                  .pipe(map(() => new AuthRegisterSuccess()))
        ),
        catchError(err => {
          logger.error(err);
          return of(new AuthRegisterFailed());
        })
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    mergeMap(() =>
      this.auth.signOut().pipe(
        map(() => new AuthLogoutSuccess()),
        catchError(err => {
          logger.error(err);
          return of(new AuthLogoutFailed());
        })
      )
    )
  );
}
