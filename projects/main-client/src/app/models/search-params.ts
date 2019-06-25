export interface SearchParams<T> {
  /**
   * The key we are to orderBy
   */
  orderBy: keyof T;
  /**
   * The limit we are to return
   */
  limit: number;
}
