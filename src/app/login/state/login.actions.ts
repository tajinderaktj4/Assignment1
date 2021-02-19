import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN_START = '[login start] from login';
export const LOGIN_SUCCESS = '[login success]  from login';

export const loginStart = createAction(LOGIN_START, props<{email:string;password:string}>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user:User}>());