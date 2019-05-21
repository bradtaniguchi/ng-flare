import { Group } from '../../models/group';

export enum GroupActionTypes {
  GET_GROUPS = '[Group] GET_GROUPS',
  GET_GROUPS_UPDATE = '[Group] GET_GROUPS_UPDATE',
  GET_GROUPS_FAILED = '[Group] GET_GROUPS_FAILED',
  GET_GROUPS_STOP = '[Group] GET_GROUPS_STOP'
}

export type GroupActions =
  | GetGroups
  | GroupsUpdate
  | GetGroupsFailed
  | StopGetGroups;

export class GetGroups {
  readonly type = GroupActionTypes.GET_GROUPS;
  constructor(public payload: any) {}
}

export class GroupsUpdate {
  readonly type = GroupActionTypes.GET_GROUPS_UPDATE;
  constructor(public payload: { groups: Group[] }) {}
}

export class GetGroupsFailed {
  readonly type = GroupActionTypes.GET_GROUPS_FAILED;
}

export class StopGetGroups {
  readonly type = GroupActionTypes.GET_GROUPS_STOP;
}
