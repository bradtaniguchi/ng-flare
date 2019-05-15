import { RoleType } from './role';

/**
 * A permission is saved for each group and user
 */
export interface Permission {
  type: RoleType;
  groupId: string;
  userId: string;
}
