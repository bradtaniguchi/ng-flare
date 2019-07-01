import { createAction, props } from '@ngrx/store';
import { Group } from '../../models/group';
import { SearchParams } from '../../models/search-params';
import { User } from '../../models/user';

export const groupActions = {
  select: createAction('[Group] SELECT', props<{ groupId: string }>()),
  create: createAction(
    '[Group] CREATE',
    props<{
      group: Partial<Group>;
    }>()
  ),
  createSuccess: createAction(
    '[Group] CREATE_SUCCESS',
    props<{ group: Group }>()
  ),
  createFailed: createAction('[Group] CREATE_FAILED'),

  searchUserGroups: createAction(
    '[Group] SEARCH_USER_GROUPS',
    props<Partial<SearchParams<Group>>>()
  ),

  searchUserGroupsUpdate: createAction(
    '[Group] SEARCH_USER_GROUPS_UPDATE',
    props<{ groups: Group[] }>()
  ),

  searchUserGroupsFailed: createAction('[Group] SEARCH_USER_GROUPS_FAILED'),

  search: createAction('[Group] SEARCH', props<Partial<SearchParams<Group>>>()),
  searchUpdate: createAction(
    '[Group] SEARCH_UPDATE',
    props<{ groups: Group[] }>()
  ),
  searchFailed: createAction('[Group] SEARCH_FAILED'),

  createGroupWithUsers: createAction(
    '[Group] CREATE_GROUP_WITH_USERS',
    props<{ group: Partial<Group>; users: Array<Partial<User>> }>()
  ),

  createGroupWithUsersSuccess: createAction(
    '[Group] CREATE_GROUP_WITH_USERS_SUCCESS',
    props<{ group: Group }>()
  ),

  createGroupWithUsersFailed: createAction(
    '[Group] CREATE_GROUP_WITH_USERS_FAILED'
  )
};
