import { LoadingTypes, LoadingActions } from './loading.actions';

export interface LoadingState {
  useLoading: boolean;
}
export function LoadingReducer(
  state: LoadingState = { useLoading: true },
  action: LoadingActions
): LoadingState {
  switch (action.type) {
    case LoadingTypes.USE_LOADING:
      return { ...state, useLoading: true };
    case LoadingTypes.DONT_USE_LOADING:
      return { ...state, useLoading: false };
    default:
      return state;
  }
}
