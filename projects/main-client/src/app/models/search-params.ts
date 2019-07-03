import { Filter } from '../app-store/filter';

export interface SearchParams<T> {
  /**
   * The key we are to orderBy
   */
  orderBy?: keyof T;
  /**
   * The limit we are to return
   */
  limit?: number;

  /**
   * The call number, used to "cancel" a call later
   */
  callNum?: number;

  /**
   * Filters to apply to the search query.
   * **NOTE** each type of filter will require new indexing to be added
   */
  filters?: Array<Filter<T>>;
}
