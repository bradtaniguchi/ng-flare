import { createAction, props } from '@ngrx/store';

export const disconnect = createAction(
  '[Disconnect]',
  props<{
    callNumbers: number[];
  }>()
);
