import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModule } from '../Models/user/user.module';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:5000/api/Authentication/';
const TOKEN_KEY = 'auth-token';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient , private tokenService: TokenService , private router: Router) { }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }
  register(user: UserModule): Promise<any>{
    return new Promise((resolve, reject) => {

      this.http.post(AUTH_API + 'signup', user).pipe(
        catchError(this.handleError)
      ).subscribe(() => {
        this.router.navigate(['/signin']);
      });
    });
  }
  isLoggedIn(): boolean{
    if (localStorage.getItem(TOKEN_KEY) !== null){
      return true;
    }else{
      return false;
    }
  }

  handleError(error: HttpErrorResponse): any {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
