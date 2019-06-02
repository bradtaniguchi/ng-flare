import { Store, Action } from '@ngrx/store';
import { AppState } from '../app-state';
import { Injectable } from '@angular/core';
import { ReportError } from './error.actions';

@Injectable({
  providedIn: 'root'
})
export class ErrorFacadeService {
  constructor(private store: Store<AppState>) {}

  public report(params: {
    err: Error | any;
    message: string;
    action?: Action;
    noRetry?: boolean;
  }) {
    this.store.dispatch(new ReportError(params));
  }
}
