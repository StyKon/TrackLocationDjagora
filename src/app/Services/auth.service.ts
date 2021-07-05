import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModule } from '../Models/user/user.module';
import { TokenService } from './token.service';
import { ActivatedRoute, Router } from '@angular/router';
const AUTH_API = 'http://localhost:5000/api/Authentication/';
const TOKEN_KEY = 'auth-token';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService, private route: Router) { }
  signIn(user: any): void {
    this.http.post<any>(AUTH_API + 'signin', user, httpOptions)
      .subscribe((res: any) => {
        this.tokenService.saveToken(res.accessToken);
        this.tokenService.saveUser(res);
        this.tokenService.saveUserId(res.UserId);
        console.log('ok');
        this.route.navigate(['home']);
      // tslint:disable-next-line:variable-name
      }, catchError( _err => {
        return this.route.navigate(['login']);
      }));
  }
  // register(user: UserModule): Promise<any>{
  //   return new Promise((resolve, reject) => {

  //     this.http.post(AUTH_API + 'signup', user).pipe(
  //       catchError(this.handleError)
  //     ).subscribe(() => {
  //       this.router.navigate(['/login']);
  //     });
  //   });
  // }
  isLoggedIn(): boolean{
    if (window.sessionStorage.getItem(TOKEN_KEY) !== null){
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
