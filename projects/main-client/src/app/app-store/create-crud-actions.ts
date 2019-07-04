import { createAction, props, ActionCreator } from '@ngrx/store';
import { SearchParams } from '../models/search-params';
import { TypedAction } from '@ngrx/store/src/models';

export interface CrudActions<T> {
  // create actions
  create: ActionCreator<
    string,
    (props: {
      entity: Partial<T>;
    }) => { entity: Partial<T> } & TypedAction<string>
  >;
  createSuccess: ActionCreator<
    string,
    (props: { entity: T }) => { entity: T } & TypedAction<string>
  >;
  createFailed: ActionCreator<
    string,
    (props: {
      entity: Partial<T>;
    }) => { entity: Partial<T> } & TypedAction<string>
  >;

  // bulkCreate
  bulkCreate: ActionCreator<
    string,
    (props: {
      entities: Array<Partial<T>>;
    }) => { entities: Array<Partial<T>> } & TypedAction<string>
  >;
  bulkCreateSuccess: ActionCreator<
    string,
    (props: {
      entities: Array<T>;
    }) => { entities: Array<T> } & TypedAction<string>
  >;
  bulkCreateFailed: ActionCreator<
    string,
    (props: {
      entities: Array<Partial<T>>;
    }) => { entities: Array<Partial<T>> } & TypedAction<string>
  >;

  // remove
  remove: ActionCreator<
    string,
    (props: { key: string }) => { key: string } & TypedAction<string>
  >;
  removeSuccess: ActionCreator<
    string,
    (props: { key: string }) => { key: string } & TypedAction<string>
  >;
  removeFailed: ActionCreator<
    string,
    (props: { key: string }) => { key: string } & TypedAction<string>
  >;

  // bulk remove
  bulkRemove: ActionCreator<
    string,
    (props: { keys: string[] }) => { keys: string[] } & TypedAction<string>
  >;
  bulkRemoveSuccess: ActionCreator<
    string,
    (props: { keys: string[] }) => { keys: string[] } & TypedAction<string>
  >;
  bulkRemoveFailed: ActionCreator<
    string,
    (props: { keys: string[] }) => { keys: string[] } & TypedAction<string>
  >;

  // update
  update: ActionCreator<
    string,
    (props: {
      entity: Partial<T>;
    }) => { entity: Partial<T> } & TypedAction<string>
  >;
  updateSuccess: ActionCreator<
    string,
    (props: { entity: T }) => { entity: T } & TypedAction<string>
  >;
  updateFailed: ActionCreator<
    string,
    (props: {
      entity: Partial<T>;
    }) => { entity: Partial<T> } & TypedAction<string>
  >;

  // bulk update
  bulkUpdate: ActionCreator<
    string,
    (props: {
      entities: Array<Partial<T>>;
    }) => { entities: Array<Partial<T>> } & TypedAction<string>
  >;
  bulkUpdateSuccess: ActionCreator<
    string,
    (props: {
      entities: Array<T>;
    }) => { entities: Array<T> } & TypedAction<string>
  >;
  bulkUpdateFailed: ActionCreator<
    string,
    (props: {
      entities: Array<Partial<T>>;
    }) => { entities: Array<Partial<T>> } & TypedAction<string>
  >;

  // get
  get: ActionCreator<
    string,
    (props: {
      key: string;
      callNum: number;
    }) => { key: string; callNum: number } & TypedAction<string>
  >;
  getUpdate: ActionCreator<
    string,
    (props: { entity: T }) => { entity: T } & TypedAction<string>
  >;
  getFailed: ActionCreator<
    string,
    (props: {
      key: string;
      callNum: number;
    }) => { key: string; callNum: number } & TypedAction<string>
  >;
  getStop: ActionCreator<
    string,
    (props: {
      key: string;
      callNum: number;
    }) => { key: string; callNum: number } & TypedAction<string>
  >;

  // search
  search: ActionCreator<
    string,
    (props: SearchParams<T>) => SearchParams<T> & TypedAction<string>
  >;
  searchUpdate: ActionCreator<
    string,
    (props: { entities: T[] }) => { entities: T[] } & TypedAction<string>
  >;
  searchFailed: ActionCreator<
    string,
    (props: { callNum: number }) => { callNum: number } & TypedAction<string>
  >;
  searchStop: ActionCreator<
    string,
    (props: { callNum: number }) => { callNum: number } & TypedAction<string>
  >;
}
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
export const createCrudActions = <T>({ type }: { type: string }) =>
  ({
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
        key: string;
      }>()
    ),
    removeSuccess: createAction(
      getPrefix({ type, action: 'REMOVE_SUCCESS' }),
      props<{
        key: string;
      }>()
    ),
    removeFailed: createAction(
      getPrefix({ type, action: 'REMOVE_FAILED' }),
      props<{
        key: string;
      }>()
    ),

    // bulk remove
    bulkRemove: createAction(
      getPrefix({ type, action: 'BULK_REMOVE' }),
      props<{
        keys: string[];
      }>()
    ),
    bulkRemoveSuccess: createAction(
      getPrefix({ type, action: 'BULK_REMOVE_SUCCESS' }),
      props<{
        keys: string[];
      }>()
    ),
    bulkRemoveFailed: createAction(
      getPrefix({ type, action: 'BULK_REMOVE_FAILED' }),
      props<{
        keys: string[];
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
      props<{ key: string; callNum: number }>()
    ),
    getUpdate: createAction(
      getPrefix({ type, action: 'GET_UPDATE' }),
      props<{ entity: T }>()
    ),
    getFailed: createAction(
      getPrefix({ type, action: 'GET_FAILED' }),
      props<{ key: string; callNum: number }>()
    ),
    getStop: createAction(
      getPrefix({ type, action: 'GET_STOP' }),
      props<{ key: string; callNum: number }>()
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
  } as CrudActions<T>);
