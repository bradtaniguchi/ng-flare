import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Group } from '../../models/group';
import { createReducer, on, Action } from '@ngrx/store';
import { groupActions } from './group.actions';

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
  on(groupActions.searchUserGroups, state => ({
    ...state,
    loading: true
  })),
  on(groupActions.searchUpdate, (state, { entities }) =>
    groupAdapter.upsertMany(entities, {
      ...state,
      loading: false
    })
  ),
  on(groupActions.select, (state, { groupId }) => ({
    ...state,
    selected: groupId
  })),
  on(groupActions.create, state => ({ ...state, loading: true })),
  on(groupActions.createSuccess, (state, { entity }) =>
    groupAdapter.upsertOne(entity, { ...state, loading: false })
  ),
  on(groupActions.searchUserGroups, state => ({ ...state, loading: true })),
  on(groupActions.searchUserGroupsUpdate, (state, { groups }) =>
    groupAdapter.upsertMany(groups, { ...state, loading: false })
  ),
  on(groupActions.searchUserGroups, state => ({ ...state, loading: false }))
);
export function GroupReducer(state: GroupState, action: Action) {
  return reducer(state, action);
}
