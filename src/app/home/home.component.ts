import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from '../selectors/login.selector';
import { LoginState } from '../state/login.state';
import { User } from '../model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: Observable<User>;
  constructor(private store: Store<LoginState>) { }

  ngOnInit(): void {
    this.email = this.store.select(getUser);
  }
}
