import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/Token';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


const apiUrl = 'https://kcpelevennote.azurewebsites.net';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: Token;
  isLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  register(regUserData: RegisterUser) {
    return this.http.post(`${apiUrl}/api/Account/Register`, regUserData);
  }
  login(loginInfo) {
    const str = `grant_type=password&username=${encodeURI(loginInfo.email)}&password=${encodeURI(loginInfo.password)}`;
    return this.http.post(`${apiUrl}/token`, str).subscribe((token: Token) => {localStorage.setItem('id_t;oken', token.access_token);
    this.isLoggedIn.next(true);
// tslint:disable-next-line: align
    this.router.navigate(['/']);
    } );
  }
  logout(): Observable<Object>{
    localStorage.clear();
    this.isLoggedIn.next(false);

    return this.http.post(`${apiUrl}/api/Acount/Logout`, { headers: this.setHeader() })
  }

  currentUser(): Observable<Object> {
    if (!localStorage.getItem('id_token')) {return new Observable(observer => observer.next(false)); }

    return this.http.get(`${apiUrl}/api/Account/UserInfo`, { headers: this.setHeader()});
  }
  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }

}
