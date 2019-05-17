import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { StartLoading, StopLoading, SetLoading } from './loading.actions';

@Injectable({
  providedIn: 'root'
})
export class LoadingFacadeService {
  public getLoadingState$ = createSelector(
    (state: AppState) => state,
    state => state.loading
  );
  constructor(private store: Store<AppState>) {}

  public startLoading() {
    this.store.dispatch(new StartLoading());
  }

  public stopLoading() {
    this.store.dispatch(new StopLoading());
  }

  public setLoading(loading: boolean) {
    this.store.dispatch(new SetLoading({ loading }));
  }
}
