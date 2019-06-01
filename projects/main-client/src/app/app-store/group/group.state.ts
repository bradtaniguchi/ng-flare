import { SearchParams } from '../../models/search-params';
import { Group } from '../../models/group';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  GroupActions,
  GroupActionTypes,
  SetSelectedGroup
} from './group.actions';

export interface GroupState extends EntityState<Group>, SearchParams<Group> {
  loading: boolean;
  /**
   * The currently selected group
   */
  selected?: string;
}

export const groupAdapter = createEntityAdapter<Group>({
  selectId: group => group.uid
});

export const setSelectedGroup = (
  state: GroupState = {
    loading: false,
    ids: [],
    entities: {},
    orderBy: 'name',
    limit: 2
  },
  { payload }: SetSelectedGroup
) => ({
  ...state,
  selected:
    payload && payload.group
      ? typeof payload.group === 'string'
        ? payload.group
        : payload.group.uid
      : undefined
});
export function GroupReducer(
  state: GroupState = {
    loading: false,
    ids: [],
    entities: {},
    orderBy: 'name',
    limit: 2
  },
  action: GroupActions
): GroupState {
  switch (action.type) {
    case GroupActionTypes.LIST_USER_GROUPS:
      return { ...state, loading: true, ...action.payload };
    case GroupActionTypes.LIST_USER_GROUPS_UPDATE:
      return groupAdapter.upsertMany(action.payload.groups, {
        ...state,
        loading: false
      });
    case GroupActionTypes.SET_SELECTED_GROUP:
      return setSelectedGroup(state, action);
    default:
      return state;
  }
}
