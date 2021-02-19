import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { LoginService } from '../login.service';
import { loginStart, loginSuccess } from "./login.actions";
import { exhaustMap, map, tap } from 'rxjs/operators'; 
import { Router } from "@angular/router";

@Injectable()
export class LoginEffects{
    constructor(private action$: Actions, private loginService: LoginService, private router: Router){}

    login$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(loginStart),exhaustMap((action)=>{
                return this.loginService.authenticate(action.email,action.password).pipe(
                    map(data=>{
                        const user = this.loginService.formatUser(data);
                        return loginSuccess({user});
                    })
                );
            })
        );
    });

    loginRedirect$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(loginSuccess),
            tap((action)=>{
                this.router.navigate(['/home']);
            })
        )
    }, {dispatch:false});
}