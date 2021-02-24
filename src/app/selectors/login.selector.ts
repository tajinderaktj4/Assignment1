import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../state/login.state';

export const LOGIN_STATE_NAME = 'login';
const getLoginState = createFeatureSelector<LoginState>(LOGIN_STATE_NAME);

export const isAuthenticated = createSelector(getLoginState, (state) => {
  return state.user ? true : false;
});
export const getErrorMessage = createSelector(getLoginState, (state) => {
  return state.errorMessage;
});
export const getUser = createSelector(getLoginState, (state) => {
  return state.user;
});
