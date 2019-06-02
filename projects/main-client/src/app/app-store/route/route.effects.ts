import { Injectable } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EndRoute, StartRoute, RouteActionTypes, Route } from './route.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';

@Injectable({
  providedIn: 'root'
})
export class RouteEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  routeEvents$ = this.router.events.pipe(
    tap((event: Event) => {
      if (event instanceof NavigationStart) {
        return this.store.dispatch(
          new StartRoute({
            url: event.url
          })
        );
      }
      if (event instanceof NavigationEnd) {
        return this.store.dispatch(
          new EndRoute({
            url: event.url,
            urlAfterRedirects: event.urlAfterRedirects
          })
        );
      }
    })
  );

  @Effect({ dispatch: false })
  route$ = this.actions$.pipe(
    ofType(RouteActionTypes.ROUTE),
    tap((action: Route) =>
      this.router.navigateByUrl(action.payload.url, action.payload.extras)
    )
  );
}
