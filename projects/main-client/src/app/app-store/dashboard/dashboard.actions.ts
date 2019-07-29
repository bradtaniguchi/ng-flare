import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../../models/dashboard';
import { User } from '../../models/user';

export const dashboardActions = {
  // create
  create: createAction('[Dashboard] CREATE', props<{ user: User }>()),
  createSuccess: createAction(
    '[Dashboard] CREATE_SUCCESS',
    props<{
      dashboard: Dashboard;
    }>()
  ),
  createFailed: createAction(
    '[Dashboard] CREATE_FAILED',
    props<{ user: User }>()
  ),

  // get
  get: createAction(
    '[Dashboard] GET',
    props<{ callNum: number; user: User }>()
  ),
  getUpdate: createAction(
    '[Dashboard] GET_UPDATE',
    props<{
      dashboard: Dashboard;
    }>()
  ),
  getFailed: createAction(
    '[Dashboard] GET_FAILED',
    props<{ callNum: number }>()
  ),
  getStop: createAction('[Dashboard] GET_STOP', props<{ callNum: number }>()),

  // update
  update: createAction(
    '[Dashboard] UPDATE',
    props<{ user: User; dashboard: Partial<Dashboard> }>()
  ),
  updateSuccess: createAction(
    '[Dashboard] UPDATE_SUCCESS',
    props<{ dashboard: Partial<Dashboard> }>()
  ),
  updateFailed: createAction(
    '[Dashboard] UPDATE_FAILED',
    props<{ dashboard: Partial<Dashboard> }>()
  )
};
