import { User } from '../model/user.model';
import * as selectors from '../selectors/login.selector';
import { initialState } from '../state/login.state';

describe('Login Selectors', () => {
    // it('should select the feature state', () => {

    // });
    it('#isAuthenticated with false', () => {
        expect(selectors.isAuthenticated.projector(initialState)).toBeFalsy;
    });
    it('#isAuthenticated with true', () => {
        expect(selectors.isAuthenticated.projector({
            user: new User('test@test.com', '2312313', 'ewrwrwefwefwe'),
            errorMessage: ''
        })).toBeFalsy;
    });
    it('#getErrorMessage with Invalid Email', () => {
        expect(selectors.getErrorMessage.projector({
            user: null,
            errorMessage: 'Email Not Found'
        })).toBe('Email Not Found');
    });
    it('#getUser with Valid User', () => {
        expect(selectors.getUser.projector({
            user: new User('test@test.com', '2312313', 'ewrwrwefwefwe'),
            errorMessage: ''
        })).not.toBe(null);
    });
});
