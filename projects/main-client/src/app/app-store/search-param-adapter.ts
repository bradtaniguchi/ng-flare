import { SearchParams } from '../models/search-params';

export interface SearchParamAdapterParams<T> {
  defaultOrderBy?: keyof T;
  defaultLimit?: number;
}

export class SearchParamAdapter<T> {
  private defaultOrderBy: keyof T | undefined;
  private defaultLimit: number;
  constructor(params?: SearchParamAdapterParams<T>) {
    this.defaultOrderBy = params && params.defaultOrderBy;
    this.defaultLimit = params && params.defaultLimit;
  }

  public updateOrderBy(
    orderBy: keyof T,
    state: SearchParams<T>
  ): SearchParams<T> {
    return { ...state, orderBy };
  }

  public updateLimit(limit: number, state: SearchParams<T>): SearchParams<T> {
    return { ...state, limit };
  }

  public reset(
    state: SearchParams<T>,
    defaults: Partial<SearchParams<T>>
  ): SearchParams<T> {
    return {
      ...state,
      orderBy: this.defaultOrderBy,
      limit: this.defaultLimit,
      ...defaults
    };
  }
}

/**
 * Returns a new instance of a searchParamAdapter class
 */
export const createSearchParamAdapter = <T>(
  params: SearchParamAdapterParams<T>
) => new SearchParamAdapter<T>();
