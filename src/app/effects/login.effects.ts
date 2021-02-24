import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../services/login.service';
import { loginStart, loginSuccess, setErrorMessage } from '../actions/login.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {
    constructor(private action$: Actions, private loginService: LoginService, private router: Router) { }

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginStart), exhaustMap((action) => {
                return this.loginService.authenticate(action.email, action.password).pipe(
                    map(data => {
                        const user = this.loginService.formatUser(data);
                        return loginSuccess({ user });
                    }), catchError((err) => {
                        const errorMessage = this.loginService.getErrorMessage(
                            err.error.error.message
                        );
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                );
            })
        );
    });

    loginRedirect$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginSuccess),
            tap((action) => {
                this.router.navigate(['/home']);
            })
        );
    }, { dispatch: false });
}
