import { Injectable } from '@angular/core';
import { select, Store, createSelector } from '@ngrx/store';
import { AppState } from '../app-state';
import { userActions } from './user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  public getUsers = createSelector(
    (state: AppState) => state.user.ids,
    (state: AppState) => state.user.entities,
    (ids, entities) => (ids as string[]).map(id => entities[id])
  );
  constructor(private store: Store<AppState>) {}

  public get(key: string) {
    this.store.dispatch(
      userActions.get({
        key,
        callNum: 0 // todo
      })
    );
  }

  /**
   * Stop getting update emissions for the given key
   */
  public getStop(key: string) {
    this.store.dispatch(
      userActions.getStop({
        key,
        callNum: 0 // TODO
      })
    );
  }

  public getGetSelector(key: string) {
    return createSelector(
      (state: AppState) => state.user.ids,
      (state: AppState) => state.user.entities,
      (ids, entities) => {
        const id = (ids as string[]).find(userId => key === userId);
        return id ? entities[id] : undefined;
      }
    );
  }

  public getLoadingSelector(key: string) {
    return createSelector(
      (state: AppState) => state.user.userLoading,
      userLoading => !!userLoading[key]
    );
  }
}
