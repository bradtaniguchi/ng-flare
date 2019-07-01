import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, tap } from 'rxjs/operators';
import { ErrorReportService } from '../../core/services/error-report/error-report.service';
import { AppState } from '../app-state';
import { ErrorActionTypes, ReportError } from './error.actions';

@Injectable({
  providedIn: 'root'
})
export class ErrorEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private matSnackBar: MatSnackBar,
    private errorReportService: ErrorReportService
  ) {}

  @Effect({ dispatch: false })
  catchError$ = this.actions$.pipe(
    ofType(ErrorActionTypes.REPORT),
    tap((action: ReportError) =>
      this.errorReportService.report(action.payload)
    ),
    mergeMap((action: ReportError) =>
      this.matSnackBar
        .open(action.payload.message, 'Retry', {
          duration: 2000
        })
        .afterDismissed()
        .pipe(
          tap(
            ({ dismissedByAction }) =>
              dismissedByAction &&
              action.payload.action &&
              !action.payload.noRetry &&
              action instanceof ReportError &&
              this.store.dispatch(action.payload.action)
          )
        )
    )
  );
}
