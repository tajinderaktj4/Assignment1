import { User } from '../user.model';
import * as selectors from './login.selector';

describe('isAuthenticated',()=>{
    it('#isAuthenticated with false', () => {
        expect(selectors.isAuthenticated({user:null})).toBeFalsy;
    });
    it('#isAuthenticated with true', () => {
        expect(selectors.isAuthenticated({user:new User('abc@abc.com','123','111')})).toBeTruthy;
    });
    it('validating const value of LOGIN_STATE_NAME',()=>{
        let temp = 'login';
        expect(selectors.LOGIN_STATE_NAME).toBe(temp);
    })
});