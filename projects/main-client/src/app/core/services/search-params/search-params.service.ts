import { Injectable } from '@angular/core';
import { createSelector } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { Dictionary } from '@ngrx/entity';
import { SearchParams } from '../../../models/search-params';

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
      (ids: string[], entities) => (ids || []).map(id => entities[id])
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

  /**
   * Returns a selector that provides search capabilities over a given list
   * of entities
   */
  public search<T>(selector: (state: AppState) => { [key: string]: T }) {
    return createSelector(
      selector,
      (entities: { [key: string]: T }, props: Partial<SearchParams<T>>) => {
        const arr = Object.values(entities);
        const length = arr.length;
        return arr
          .sort((a, b) =>
            ('' + (a as any)[props.orderBy || 'name']).localeCompare(
              '' + (b as any)[props.orderBy || 'name']
            )
          )
          .slice(0, props.limit || length);
      }
    );
  }
}
