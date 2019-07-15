import { createCrudActions } from '../create-crud-actions';
import { User } from '../../models/user';

export const userActions = {
  ...createCrudActions<User>({ type: 'User' })
};
