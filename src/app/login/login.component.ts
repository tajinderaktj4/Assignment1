import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginStart } from '../actions/login.actions';
import { getErrorMessage } from '../selectors/login.selector';
import { LoginState } from '../state/login.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: Observable<string>;
  constructor(private store: Store<LoginState>) { }

  ngOnInit(): void {
    this.errorMessage = this.store.select(getErrorMessage);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    });
  }
  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.store.dispatch(loginStart({ email, password }));
    }


  }

}
