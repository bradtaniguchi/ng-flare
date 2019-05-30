import { Group } from '../../models/group';
import { Action } from '@ngrx/store';
import { SearchParams } from '../../models/search-params';

export enum GroupActionTypes {
  LIST_USER_GROUPS = '[Group] GET_GROUPS',
  LIST_USER_GROUPS_UPDATE = '[Group] LIST_USER_GROUPS_UPDATE',
  LIST_USER_GROUPS_FAILED = '[Group] LIST_USER_GROUPS_FAILED',
  LIST_USER_GROUPS_STOP = '[Group] GET_GROUPS_STOP',

  SET_SELECTED_GROUP = '[Group] SET_SELECTED_GROUP'
}

export type GroupActions =
  | ListUserGroups
  | ListUserGroupsUpdate
  | ListUserGroupsFailed
  | ListUserGroupsStop
  | SetSelectedGroup;

export class ListUserGroups implements Action {
  readonly type = GroupActionTypes.LIST_USER_GROUPS;
  constructor(public payload?: Partial<SearchParams<Group>>) {}
}

export class ListUserGroupsUpdate implements Action {
  readonly type = GroupActionTypes.LIST_USER_GROUPS;
  constructor(public payload: { groups: Group[] }) {}
}

export class ListUserGroupsFailed implements Action {
  readonly type = GroupActionTypes.LIST_USER_GROUPS_FAILED;
}

export class ListUserGroupsStop implements Action {
  readonly type = GroupActionTypes.LIST_USER_GROUPS_STOP;
}

export class SetSelectedGroup implements Action {
  readonly type = GroupActionTypes.SET_SELECTED_GROUP;
  constructor(public payload: { group?: Group | string }) {}
}
