import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { LoginState } from './state/login.state';

import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<LoginState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [ReactiveFormsModule, StoreModule.forRoot({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('email field validity', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('password field validity', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue("12345");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();

    // Set email to something correct
    password.setValue("123456789");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
});
  it('submitting a form ', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("123456");
    component.onLoginSubmit();
    expect(component.loginForm.valid).toBeTruthy();
  });
  it('submitting a form with invalid form', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("test@test");
    component.loginForm.controls['password'].setValue("12345");
    component.onLoginSubmit();
    expect(component.loginForm.valid).toBeFalsy();
  });
});
