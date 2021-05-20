import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CarModule } from '../Models/car/car.module';
const API_PATH = 'http://localhost:5000/api/Cars';
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
export class CarService {

  formData: CarModule;
  CarId: number;
  constructor(private http: HttpClient, private router: Router ) { }

  addCar(Car): Observable<CarModule>{
    return this.http.post<CarModule>(API_PATH, Car, {responseType: 'json'} );
  }
  getAllCar(): Observable<CarModule[]>{
     return this.http.get<CarModule[]>(API_PATH, {responseType: 'json'});
  }
  getCarById(id): Observable<CarModule>{
    return this.http.get<CarModule>(API_PATH + '/' + id, {responseType: 'json'});
  }
  editeCar(id, Car: any): Observable<CarModule>{
    return this.http.put<CarModule>(API_PATH + '/' + id, Car, {responseType: 'json'} );
  }
  deleteCar(id): Observable<CarModule>{
    return this.http.delete<CarModule>(API_PATH + '/' + id, {responseType: 'json'});
  }
}
