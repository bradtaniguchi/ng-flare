export interface SearchParams<T> {
  orderBy: keyof T;
  limit: number;
}
