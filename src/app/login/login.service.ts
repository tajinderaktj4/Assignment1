import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { LoginResponseData } from './loginResponseData.model';
import { Observable } from 'rxjs';
import { User } from './user.model';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  authenticate(email:string,password:string):Observable<LoginResponseData>{
    return this.http.post<LoginResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,{email, password, returnSecuretoken: true});
  }

  formatUser(data: LoginResponseData){
    const user = new User(data.email,data.idToken,data.localId);
    return user;
  }
}
