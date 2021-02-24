import { User } from '../model/user.model';
import * as fromLogin from './login.actions';

describe('loadLogins', () => {
  it('should return an Login start action', () => {
    expect(fromLogin.loginStart({ email: 'test@test.com', password: '123456' }).type).toBe('[login start] from login');
  });
  it('should return an Login success action', () => {
    expect(fromLogin.loginSuccess({ user: new User('test@test.com', '1312312', 'sfsdafsdfsdf') }).type).toBe('[login success]  from login');
  });
  it('should return an Login failure action', () => {
    expect(fromLogin.setErrorMessage({ message: 'INVALID EMAIL' }).type).toBe('[login fail] from login');
  });

});
