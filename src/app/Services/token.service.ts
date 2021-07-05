import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModule } from '../Models/user/user.module';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ID = 'userId';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient , private router: Router) { }
  public signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: UserModule): void {
    window.sessionStorage.removeItem(USER_KEY);
   // window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
 //   window.sessionStorage.setItem(USER_ID, user.UserId.toString());
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  public saveUserId(UserId: any): any {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, JSON.stringify(UserId));
  }

   public getUserId(): any{
    return JSON.parse(sessionStorage.getItem(USER_ID));
   }
}
