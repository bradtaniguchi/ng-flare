import { EntityState } from '@ngrx/entity';

/**
 * Utility function that returns a common state that includes
 * the EntityState for ngrx entity and searchParams state.
 */
export const getDefaultState = (state: any): any => ({
  ...state,
  ids: [],
  entities: {}
});
