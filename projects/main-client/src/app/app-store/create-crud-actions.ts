import { createAction, props } from '@ngrx/store';
import { SearchParams } from '../models/search-params';

const getPrefix = ({ type, action }: { type: string; action: string }) =>
  `[${type}] ${action.toUpperCase()}`;
/**
 * Returns a map of actions for a given entity type.
 * This can be used to quickly create basic CRUD actions for a
 * given entity.
 * currently supported:
 * 1. create
 * 2. bulkCreate
 * 3. remove
 * 4. bulkRemove
 * 5. update
 * 6. bulkUpdate
 * 7. get
 * 8. search
 */
export const createCrudActions = <T>({ type }: { type: string }) => ({
  // create
  create: createAction(
    getPrefix({ type, action: 'CREATE' }),
    props<{
      entity: Partial<T>;
    }>()
  ),
  createSuccess: createAction(
    getPrefix({ type, action: 'CREATE_SUCCESS' }),
    props<{
      entity: T;
    }>()
  ),
  createFailed: createAction(
    getPrefix({ type, action: 'CREATE_FAILED' }),
    props<{ entity: Partial<T> }>()
  ),

  // bulk create
  bulkCreate: createAction(
    getPrefix({ type, action: 'BULK_CREATE' }),
    props<{
      entities: Array<Partial<T>>;
    }>()
  ),
  bulkCreateSuccess: createAction(
    getPrefix({ type, action: 'BULK_CREATE_SUCCESS' }),
    props<{
      entities: Array<T>;
    }>()
  ),
  bulkCreateFailed: createAction(
    getPrefix({ type, action: 'BULK_CREATE_SUCCESS' }),
    props<{
      entities: Array<Partial<T>>;
    }>()
  ),

  // remove
  remove: createAction(
    getPrefix({ type, action: 'REMOVE' }),
    props<{
      id: string;
    }>()
  ),
  removeSuccess: createAction(
    getPrefix({ type, action: 'REMOVE_SUCCESS' }),
    props<{
      id: string;
    }>()
  ),
  removeFailed: createAction(
    getPrefix({ type, action: 'REMOVE_FAILED' }),
    props<{
      id: string;
    }>()
  ),

  // bulk remove
  bulkRemove: createAction(
    getPrefix({ type, action: 'BULK_REMOVE' }),
    props<{
      ids: string[];
    }>()
  ),
  bulkRemoveSuccess: createAction(
    getPrefix({ type, action: 'BULK_REMOVE_SUCCESS' }),
    props<{
      ids: string[];
    }>()
  ),
  bulkRemoveFailed: createAction(
    getPrefix({ type, action: 'BULK_REMOVE_FAILED' }),
    props<{
      ids: string[];
    }>()
  ),

  // update
  update: createAction(
    getPrefix({ type, action: 'REMOVE' }),
    props<{
      entity: Partial<T>;
    }>()
  ),
  updateSuccess: createAction(
    getPrefix({ type, action: 'REMOVE_SUCCESS' }),
    props<{
      entity: T;
    }>()
  ),
  updateFailed: createAction(
    getPrefix({ type, action: 'REMOVE_FAILED' }),
    props<{
      entity: Partial<T>;
    }>()
  ),
  // bulkUpdate
  bulkUpdate: createAction(
    getPrefix({ type, action: 'BULK_UPDATE' }),
    props<{
      entities: Array<Partial<T>>;
    }>()
  ),
  bulkUpdateSuccess: createAction(
    getPrefix({ type, action: 'BULK_UPDATE_SUCCESS' }),
    props<{
      entities: Array<T>;
    }>()
  ),
  bulkUpdateFailed: createAction(
    getPrefix({ type, action: 'BULK_UPDATE_FAILED' }),
    props<{
      entities: Array<Partial<T>>;
    }>()
  ),

  // get
  get: createAction(
    getPrefix({ type, action: 'GET' }),
    props<{ id: string; callNum: number }>()
  ),
  getUpdate: createAction(
    getPrefix({ type, action: 'GET_UPDATE' }),
    props<{ entity: T }>()
  ),
  getFailed: createAction(
    getPrefix({ type, action: 'GET_FAILED' }),
    props<{ callNum: number }>()
  ),
  getStop: createAction(
    getPrefix({ type, action: 'GET_STOP' }),
    props<{ callNum: number }>()
  ),

  // search
  search: createAction(
    getPrefix({ type, action: 'SEARCH' }),
    props<SearchParams<T>>()
  ),
  searchUpdate: createAction(
    getPrefix({ type, action: 'SEARCH_UPDATE' }),
    props<{ entities: T[] }>()
  ),
  searchFailed: createAction(
    getPrefix({ type, action: 'SEARCH_FAILED' }),
    props<{ callNum: number }>()
  ),
  searchStop: createAction(
    getPrefix({ type, action: 'SEARCH_STOP' }),
    props<{ callNum: number }>()
  )
});
