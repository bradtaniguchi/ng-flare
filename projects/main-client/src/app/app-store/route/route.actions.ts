import { Action } from '@ngrx/store';
import { UrlTree, NavigationExtras } from '@angular/router';

export enum RouteActionTypes {
  START = '[Route] START',
  END = '[Route] END',
  ROUTE = '[Route] ROUTE'
}

export type RouteActions = StartRoute | EndRoute | Route;

export class StartRoute implements Action {
  readonly type = RouteActionTypes.START;
  constructor(
    public payload: {
      url: string;
    }
  ) {}
}

export class EndRoute implements Action {
  readonly type = RouteActionTypes.END;
  constructor(
    public payload: {
      url: string;
      urlAfterRedirects: string;
    }
  ) {}
}

/**
 * Used to route the user inside of another effect
 */
export class Route implements Action {
  readonly type = RouteActionTypes.ROUTE;
  constructor(
    public payload: {
      url: string | UrlTree;
      extras: NavigationExtras;
    }
  ) {}
}
