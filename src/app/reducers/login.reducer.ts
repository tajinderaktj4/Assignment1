import { initialState } from '../state/login.state';
import { createReducer, on } from '@ngrx/store';
import { loginSuccess, setErrorMessage } from '../actions/login.actions';

export const loginReducer = createReducer(initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
        };
    }),
    on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message,
        };
    })
);
