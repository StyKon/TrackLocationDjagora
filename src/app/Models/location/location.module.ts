import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarModule } from '../car/car.module';
import { UserModule } from '../user/user.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LocationModule {
  LocationID: number;
  Latitude: number;
  Longitude: number;
  Speed: number;
  startDate: Date;
  endDate: Date;
  car: CarModule[];
  tracks: TrackEvent[];
  user: UserModule[];
 }

