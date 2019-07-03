/**
 * A search filter
 */
export interface Filter<T> {
  prop: keyof T;
  op: '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
  value: any;
}
