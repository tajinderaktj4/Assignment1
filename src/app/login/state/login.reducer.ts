import { initialState } from "./login.state";
import { createReducer, on } from '@ngrx/store';
import { loginSuccess } from "./login.actions";

const _loginReducer = createReducer(initialState,
    on(loginSuccess, (state, action)=>{
        console.log(action);
        return{
            ...state,
            user: action.user,
        }
    })
    );

export function loginReducer(state, action){
    return _loginReducer(state,action);
}