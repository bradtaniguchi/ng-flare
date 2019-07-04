import { EntityAdapter, EntityState } from '@ngrx/entity';
import { on } from '@ngrx/store';
import { CrudActions } from './create-crud-actions';

export interface EntityStateWithLoading<T> extends EntityState<T> {
  loading: boolean;
}
export const createCrudReducerHandlers = <
  T,
  U extends EntityStateWithLoading<T>
>({
  actions,
  adapter
}: {
  actions: CrudActions<T>;
  adapter: EntityAdapter<T>;
}) => [
  // create actions
  on(actions.create, (state: U) => ({ ...state, loading: true })),
  on(actions.createSuccess, (state: U, { entity }) =>
    adapter.upsertOne(entity, { ...state, loading: false })
  ),
  on(actions.createFailed, (state: U, { entity }) => ({
    ...state,
    loading: false
  })),

  // bulkCreate
  on(actions.bulkCreate, (state: U) => ({ ...state, loading: true })),
  on(actions.bulkCreateSuccess, (state: U, { entities }) =>
    adapter.upsertMany(entities, { ...state, loading: false })
  ),
  on(actions.bulkCreateFailed, (state: U) => ({
    ...state,
    loading: false
  })),

  // remove
  on(actions.remove, (state: U, { key }) =>
    adapter.removeOne(key, { ...state, loading: true })
  ),
  on(actions.removeSuccess, (state: U) => ({ ...state, loading: false })),
  on(actions.removeFailed, (state: U) => ({ ...state, loading: false })),

  // bulk remove
  on(actions.bulkRemove, (state: U, { keys }) =>
    adapter.removeMany(keys, { ...state, loading: true })
  ),
  on(actions.bulkRemoveSuccess, (state: U) => ({ ...state, loading: false })),
  on(actions.bulkCreateFailed, (state: U) => ({ ...state, loading: false })),

  // update
  on(actions.update, (state: U) => ({ ...state, loading: true })),
  on(actions.updateSuccess, (state: U, { entity }) =>
    adapter.upsertOne(entity, { ...state, loading: false })
  ),
  on(actions.updateFailed, (state: U) => ({ ...state, loading: false })),

  // bulk update
  on(actions.bulkUpdate, (state: U) => ({ ...state, loading: true })),
  on(actions.bulkUpdateSuccess, (state: U, { entities }) =>
    adapter.upsertMany(entities, { ...state, loading: false })
  ),
  on(actions.bulkUpdateFailed, (state: U) => ({ ...state, loading: false })),

  // get
  on(actions.get, (state: U) => ({ ...state, loading: true })),
  on(actions.getUpdate, (state: U, { entity }) =>
    adapter.upsertOne(entity, { ...state, loading: false })
  ),
  on(actions.getFailed, (state: U) => ({ ...state, loading: false })),
  on(actions.getStop, (state: U) => ({ ...state, loading: false })),

  // search
  on(actions.search, (state: U) => ({ ...state, loading: true })),
  on(actions.searchUpdate, (state: U, { entities }) => ({
    ...state,
    loading: false
  })),
  on(actions.searchFailed, (state: U) => ({ ...state, loading: false })),
  on(actions.searchStop, (state: U) => ({ ...state, loading: false }))
];
