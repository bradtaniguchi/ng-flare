import { Injectable } from '@angular/core';
import { Filter } from '../../../app-store/filter';
import { CollectionReference, Query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {
  constructor() {}

  /**
   * Applies the given filters for a given collection reference query
   */
  public applyFilters<T>(params: {
    ref: CollectionReference;
    filters: Filter<T>[];
  }): Query {
    const { ref, filters } = params;
    if (!filters || !filters.length) {
      return ref;
    }
    return filters.reduce(
      (acc, filter) =>
        acc.where(filter.prop as string, filter.op, filter.value),
      ref
    );
  }
}
