import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { dashboardActions } from './dashboard.actions';
import {
  withLatestFrom,
  mergeMap,
  map,
  catchError,
  takeUntil
} from 'rxjs/operators';
import { AuthFacadeService } from '../auth/auth-facade.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app-state';
import { DashboardService } from '../../core/services/dashboard/dashboard.service';
import { ReportError } from '../error/error.actions';
import { CallNumService } from '../../core/services/call-num/call-num.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dashboardService: DashboardService,
    private authFacadeService: AuthFacadeService,
    private callNumService: CallNumService
  ) {}

  private user$ = this.store.pipe(select(this.authFacadeService.getUserState));

  @Effect()
  createDashboard$ = this.actions$.pipe(
    ofType(dashboardActions.create),
    withLatestFrom(this.user$),
    mergeMap(([action, user]) =>
      this.dashboardService
        .create({
          ...action,
          user
        })
        .pipe(
          map(dashboard => dashboardActions.createSuccess({ dashboard })),
          catchError(err => [
            dashboardActions.createFailed(action),
            new ReportError({
              err,
              message: 'There was an error creating dashboard'
            })
          ])
        )
    )
  );

  @Effect()
  getDashboard$ = this.actions$.pipe(
    ofType(dashboardActions.get),
    withLatestFrom(this.user$),
    mergeMap(([action, user]) =>
      this.dashboardService.get({ user }).pipe(
        map(dashboard => dashboardActions.getUpdate({ dashboard })),
        catchError(err => [
          dashboardActions.getFailed(action),
          new ReportError({
            err,
            message: 'There was an error getting dashboard'
          })
        ]),
        takeUntil(this.callNumService.takeUntil(action))
      )
    )
  );

  @Effect()
  updateDashboard$ = this.actions$.pipe(
    ofType(dashboardActions.update),
    withLatestFrom(this.user$),
    mergeMap(([action, user]) =>
      this.dashboardService.update({ ...action, user }).pipe(
        map(() => dashboardActions.updateSuccess(action)),
        catchError(err => [
          dashboardActions.updateFailed(action),
          new ReportError({
            err,
            message: 'Update dashboard failed'
          })
        ])
      )
    )
  );
}
