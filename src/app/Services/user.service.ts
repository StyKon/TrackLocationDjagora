import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModule } from '../Models/user/user.module';


const API_PATH = 'http://localhost:5000/api/Users';
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
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  addUser(User): Observable<UserModule>{
    return this.http.post<UserModule>(API_PATH, User, {responseType: 'json'} );
  }
  getUsers(): Observable<UserModule[]>{
    return this.http.get<UserModule[]>(API_PATH, { responseType: 'json' });
  }

  getUserById(id): Observable<UserModule> {
    return this.http.get<UserModule>(API_PATH + '/' + id, { responseType: 'json' });
  }
  updateUser(id, User: any): Observable<UserModule>{
    return this.http.put<UserModule>(API_PATH + '/' + id, User, { responseType: 'json' });
  }
  deleteUser(id): Observable<any>{
    return this.http.delete<UserModule>(API_PATH + '/' + id , {responseType: 'json'});
  }

  getAllUserManagerForSuperUser(id: any , type: any): Observable<UserModule[]> {
    return this.http.get<UserModule[]>(API_PATH + '/' + id + '/type/' + type, { responseType: 'json' });
  }
  getAllDriversForUserManager(id: any , type: any): Observable<UserModule[]> {
    return this.http.get<UserModule[]>(API_PATH + '/' + id + '/typeuser/' + type, { responseType: 'json' });
  }

}
