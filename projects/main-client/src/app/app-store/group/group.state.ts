import { SearchParams } from '../../models/search-params';
import { Group } from '../../models/group';

export interface GroupState extends SearchParams<Group> {
  loading: boolean;
  ids: string[];
  groups: { [key: string]: Group };
}

export function GroupReducer(state: GroupState, action: any): GroupState {
  return state;
}
