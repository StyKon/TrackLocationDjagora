import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './Views/Car/add-car/add-car.component';
import { EditCarComponent } from './Views/Car/edit-car/edit-car.component';
import { IndexCarComponent } from './Views/Car/index-car/index-car.component';
import { IndexFamilyCarComponent } from './Views/FamilyCar/index-family-car/index-family-car.component';
import { IndexTypeCarComponent } from './Views/TypeCar/index-type-car/index-type-car.component';
import { AddUserComponent } from './Views/User/add-user/add-user.component';
import { IndexUserComponent } from './Views/User/index-user/index-user.component';
const routes: Routes = [
  { path: 'test' , component: AddUserComponent},
  { path: 'car' , component: IndexCarComponent},
  { path: 'car/add' , component: AddCarComponent},
  { path: 'car/edit' , component: EditCarComponent},
  { path: 'typecar' , component: IndexTypeCarComponent},
  { path: 'familycar' , component: IndexFamilyCarComponent},
  { path: 'user' , component: IndexUserComponent},
  { path: 'user/add' , component: AddUserComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
