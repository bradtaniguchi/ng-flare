import { createAction, props } from '@ngrx/store';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { createCrudActions } from '../create-crud-actions';

export const groupActions = {
  ...createCrudActions<Group>({ type: 'Group' }),
  select: createAction('[Group] SELECT', props<{ groupId: string }>()),
  searchUserGroups: createAction(
    '[Group] SEARCH_USER_GROUPS',
    props<{
      callNum: number;
    }>()
  ),
  searchUserGroupsUpdate: createAction(
    '[Group] SEARCH_USER_GROUPS_UPDATE',
    props<{ groups: Group[] }>()
  ),
  searchUserGroupsFailed: createAction(
    '[Group] SEARCH_USER_GROUPS_FAILED',
    props<{ callNum: number }>()
  ),
  searchUserGroupsStop: createAction(
    '[Group] SEARCH_USER_GROUPS_STOP',
    props<{ callNum: number }>()
  ),
  createGroupWithUsers: createAction(
    '[Group] CREATE_GROUP_WITH_USERS',
    props<{ group: Partial<Group>; users: Array<Partial<User>> }>()
  )

  // createGroupWithUsersSuccess: createAction(
  //   '[Group] CREATE_GROUP_WITH_USERS_SUCCESS',
  //   props<{ group: Group }>()
  // ),

  // createGroupWithUsersFailed: createAction(
  //   '[Group] CREATE_GROUP_WITH_USERS_FAILED'
  // )
};
