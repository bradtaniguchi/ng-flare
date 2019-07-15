import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import { createCrudReducerHandlers } from '../create-crud-reducer';
import { userActions } from './user.actions';

export interface UserState extends EntityState<User> {
  // if anything at the "top level" is loading like create/delete
  loading: boolean;

  // if we are "searching" for the given user by id
  userLoading?: {
    // if the given user by id is loading
    [key: string]: boolean;
  };
}

export const userAdapter = createEntityAdapter<User>({
  selectId: user => user && user.uid
});

const initialState: UserState = {
  loading: false,
  ids: [],
  entities: {}
};

const onGetUser = (state: UserState, { key }: { key: string }) => ({
  ...state,
  loading: true,
  userLoading: { ...state.userLoading, [key]: true }
});

const onGetUserUpdate = (state: UserState, { entity }: { entity: User }) => ({
  ...state,
  loading: true,
  userLoading: { ...state.userLoading, [entity.uid]: false }
});

const stopLoadingByKey = (state: UserState, { key }: { key: string }) => ({
  ...state,
  loading: true,
  userLoading: { ...state.userLoading, [key]: false }
});
// these two share the same logic
const onGetStop = stopLoadingByKey;
const onGetFailed = stopLoadingByKey;

const reducer = createReducer(
  initialState,
  // these should over ride the crud handlers
  on(userActions.get, onGetUser),
  on(userActions.getUpdate, onGetUserUpdate),
  on(userActions.getStop, onGetStop),
  on(userActions.getFailed, onGetFailed),
  ...createCrudReducerHandlers({
    actions: userActions,
    adapter: userAdapter
  })
);

export function UserReducer(state: UserState, action: Action) {
  return reducer(state, action);
}
