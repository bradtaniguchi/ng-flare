import { RouteActions, RouteActionTypes } from './route.actions';

export interface RouteState {
  loading: boolean;
}

export function RouteReducer(
  state: RouteState = { loading: false },
  action: RouteActions
): RouteState {
  switch (action.type) {
    case RouteActionTypes.START:
      return { ...state, loading: true };
    case RouteActionTypes.END:
      return { ...state, loading: false };
    default:
      return state;
  }
}
