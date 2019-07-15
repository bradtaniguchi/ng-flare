export enum RoleType {
  Admin = 'Admin',
  Editor = 'Editor',
  Viewer = 'Viewer'
}
export interface Role {
  type: RoleType;
  description: string;
}

export const ADMIN_ROLE = {
  type: RoleType.Admin,
  description:
    'Can add/remove users from group, and edit all decks within the group'
};

export const EDITOR_ROLE = {
  type: RoleType.Editor,
  description:
    'Can add/remove users from group, and edit all decks within the group'
};

export const VIEWER_ROLE = {
  type: RoleType.Viewer,
  description: 'Can view all decks within the group'
};

/**
 * List of all the roles available in the application
 */
export const ROLES: Role[] = [ADMIN_ROLE, EDITOR_ROLE, VIEWER_ROLE];
