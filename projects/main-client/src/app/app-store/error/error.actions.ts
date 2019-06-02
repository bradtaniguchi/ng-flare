import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
  REPORT = '[Error] REPORT',
  REPORT_SUCCESS = '[Error] REPORT_SUCCESS',
  REPORT_FAILED = '[Error] REPORT_FAILED',
  RETRY = '[Error] RETRY'
}

export type ErrorActions =
  | ReportError
  | ReportErrorSuccess
  | ReportErrorFailed
  | RetryError;

export class ReportError implements Action {
  readonly type = ErrorActionTypes.REPORT;
  constructor(
    public payload: {
      /**
       * The message to display in the retry notify
       */
      message: string;
      err: Error | any;
      /**
       * The action to retry, or at least notify about
       */
      action?: Action;
      /**
       * If we are to not retry
       */
      noRetry?: boolean;
    }
  ) {}
}

export class ReportErrorSuccess implements Action {
  readonly type = ErrorActionTypes.REPORT_SUCCESS;
}

export class ReportErrorFailed implements Action {
  readonly type = ErrorActionTypes.REPORT_FAILED;
}

export class RetryError implements Action {
  readonly type = ErrorActionTypes.RETRY;
  constructor(
    public payload: {
      action: Action;
    }
  ) {}
}
