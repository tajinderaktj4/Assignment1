import { User } from '../model/user.model';

export interface LoginState{
    user: User | null;
    errorMessage: string;
}

export const initialState: LoginState = {
    user: null,
    errorMessage: '',
};
