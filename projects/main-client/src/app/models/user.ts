import { Permission } from './permission';
import { RoleType } from './role';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdOn?: Date;
  lastLogin?: Date;
}

/**
 * Used when adding/removing a user
 */
export interface UserFormItem {
  /**
   * Id of the user
   */
  uid: string;
  /**
   * The permission of the user to add
   */
  roleType: RoleType;
}
