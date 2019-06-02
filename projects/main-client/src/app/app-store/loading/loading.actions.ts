import { Action } from '@ngrx/store';

export enum LoadingTypes {
  USE_LOADING = '[Loading] USE_LOADING',
  DONT_USE_LOADING = '[Loading] stop'
}

export type LoadingActions = UseLoading | DontUseLoading;

export class UseLoading implements Action {
  readonly type = LoadingTypes.USE_LOADING;
}

export class DontUseLoading implements Action {
  readonly type = LoadingTypes.DONT_USE_LOADING;
}
