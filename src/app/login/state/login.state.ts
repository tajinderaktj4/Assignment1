import { User } from "../user.model";

export interface LoginState{
    user: User | null;
}

export const initialState: LoginState = {
    user: null,
}