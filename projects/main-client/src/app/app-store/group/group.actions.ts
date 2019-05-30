import { Group } from '../../models/group';
import { Action } from '@ngrx/store';
import { SearchParams } from '../../models/search-params';

export enum GroupActionTypes {
  GET_GROUPS = '[Group] GET_GROUPS',
  GET_GROUPS_UPDATE = '[Group] GET_GROUPS_UPDATE',
  GET_GROUPS_FAILED = '[Group] GET_GROUPS_FAILED',
  GET_GROUPS_STOP = '[Group] GET_GROUPS_STOP',

  SET_SELECTED_GROUP = '[Group] SET_SELECTED_GROUP'
}

export type GroupActions =
  | GetGroups
  | GroupsUpdate
  | GetGroupsFailed
  | StopGetGroups
  | SetSelectedGroup;

export class GetGroups implements Action {
  readonly type = GroupActionTypes.GET_GROUPS;
  constructor(public payload: Partial<SearchParams<Group>>) {}
}

export class GroupsUpdate implements Action {
  readonly type = GroupActionTypes.GET_GROUPS_UPDATE;
  constructor(public payload: { groups: Group[] }) {}
}

export class GetGroupsFailed implements Action {
  readonly type = GroupActionTypes.GET_GROUPS_FAILED;
}

export class StopGetGroups implements Action {
  readonly type = GroupActionTypes.GET_GROUPS_STOP;
}

export class SetSelectedGroup implements Action {
  readonly type = GroupActionTypes.SET_SELECTED_GROUP;
  constructor(public payload: { group: Group }) {}
}
