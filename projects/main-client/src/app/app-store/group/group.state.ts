import { SearchParams } from '../../models/search-params';
import { Group } from '../../models/group';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { GroupActions, GroupActionTypes } from './group.actions';

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
    case GroupActionTypes.GET_GROUPS:
      return { ...state, loading: true, ...action.payload };
    case GroupActionTypes.GET_GROUPS_UPDATE:
      return groupAdapter.upsertMany(action.payload.groups, {
        ...state,
        loading: false
      });
    case GroupActionTypes.GET_GROUPS_FAILED:
      return groupAdapter.removeAll({ ...state, loading: false });
    case GroupActionTypes.SET_SELECTED_GROUP:
      return { ...state, selected: action.payload.group.uid };
  }
  return state;
}
