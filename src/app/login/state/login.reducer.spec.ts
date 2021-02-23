import { loginSuccess } from './login.actions';
import { loginReducer } from './login.reducer';
import { initialState } from "./login.state";

describe('loginReducer',()=>{
    it('loginreducer function check',()=>{
        expect(loginReducer(initialState, loginSuccess)).toEqual({user:undefined});
    });
});