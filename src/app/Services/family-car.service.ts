import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FamilyCarModule } from '../Models/family-car/family-car.module';

const API_PATH = 'http://localhost:5000/api/FamilyCars';
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
export class FamilyCarService {


  formData: FamilyCarModule;
  FamilyCarID: number;
  NameFamily: string;
  constructor(private http: HttpClient, private router: Router ) { }

  addFamilyCar(FamilyCar): Observable<FamilyCarModule>{
    return this.http.post<FamilyCarModule>(API_PATH, FamilyCar, {responseType: 'json'} );
  }
  getAllFamilyCar(): Observable<FamilyCarModule[]>{
     return this.http.get<FamilyCarModule[]>(API_PATH, {responseType: 'json'});
  }
  getFamilyCarById(id): Observable<FamilyCarModule>{
    return this.http.get<FamilyCarModule>(API_PATH + '/' + id, {responseType: 'json'});
  }
  editeFamilyCar(id, FamilyCar: any): Observable<FamilyCarModule>{
    return this.http.put<FamilyCarModule>(API_PATH + '/' + id, FamilyCar, {responseType: 'json'} );
  }
  deleteFamilyCar(id): Observable<FamilyCarModule>{
    return this.http.delete<FamilyCarModule>(API_PATH + '/' + id, {responseType: 'json'});
  }
}
