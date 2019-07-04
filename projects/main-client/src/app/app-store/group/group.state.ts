import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Group } from '../../models/group';
import { groupActions } from './group.actions';
import { createCrudReducerHandlers } from '../create-crud-reducer';

export interface GroupState extends EntityState<Group> {
  loading: boolean;
  /**
   * The currently selected group
   */
  selected?: string;
}

export const groupAdapter = createEntityAdapter<Group>({
  selectId: group => group.uid
});

const initialState: GroupState = { loading: false, ids: [], entities: {} };
const reducer = createReducer(
  initialState,
  // ...createCrudReducerHandlers({
  //   actions: groupActions,
  //   adapter: groupAdapter
  // }),
  on(groupActions.select, (state, { groupId }) => ({
    ...state,
    selected: groupId
  })),
  on(groupActions.searchUserGroups, state => ({ ...state, loading: true })),
  on(groupActions.searchUserGroupsUpdate, (state, { groups }) =>
    groupAdapter.upsertMany(groups, { ...state, loading: false })
  ),
  on(groupActions.searchUserGroups, state => ({ ...state, loading: false }))
);
export function GroupReducer(state: GroupState, action: Action) {
  return reducer(state, action);
}
