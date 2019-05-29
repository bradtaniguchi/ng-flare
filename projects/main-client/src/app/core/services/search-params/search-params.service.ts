import { Injectable } from '@angular/core';
import { createSelector } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { Dictionary } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {
  constructor() {}

  public createLoadingSelector(selector: (state: AppState) => boolean) {
    return createSelector(
      selector,
      _ => _
    );
  }

  public createEntitiesSelector<T>(
    idSelector: (state: AppState) => string[] | number[],
    entitySelector: (state: AppState) => Dictionary<T>
  ) {
    return createSelector(
      idSelector,
      entitySelector,
      (ids: string[], entities) => ids.map(id => entities[id])
    );
  }

  public createOrderBySelector<T>(selector: (state: AppState) => keyof T) {
    return createSelector(
      selector,
      _ => _
    );
  }

  public createLimitSelector(selector: (state: AppState) => number) {
    return createSelector(
      selector,
      _ => _
    );
  }
}
