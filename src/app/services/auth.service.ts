import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient } from '@angular/common/http';
import { Token } from '../models/Token';


const apiUrl = 'https://kcpelevennote.azurewebsites.net';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(regUserData: RegisterUser) {
    return this.http.post(`${apiUrl}/api/Account/Register`, regUserData);
  }
  login(loginInfo){
    const str = `grant_type=password&username=${encodeURI(loginInfo.email)}&password=${encodeURI(loginInfo.password)}`;
    return this.http.post(`${apiUrl}/token`, str).subscribe((token: Token) =>{localStorage.setItem('id_token', token.access_token); } );
  }
}
