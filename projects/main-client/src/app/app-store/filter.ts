/**
 * A search filter
 */
export interface Filter<T> {
  prop: keyof T;
  op: FilterOp;
  value: any;
}

export type FilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
