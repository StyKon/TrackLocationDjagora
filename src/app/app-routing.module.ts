import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './Views/Car/add-car/add-car.component';
import { EditCarComponent } from './Views/Car/edit-car/edit-car.component';
import { IndexCarComponent } from './Views/Car/index-car/index-car.component';
import { IndexFamilyCarComponent } from './Views/FamilyCar/index-family-car/index-family-car.component';
import { IndexTypeCarComponent } from './Views/TypeCar/index-type-car/index-type-car.component';
import { AddUserComponent } from './Views/User/add-user/add-user.component';
import { EditUserComponent } from './Views/User/edit-user/edit-user.component';
import { IndexUserComponent } from './Views/User/index-user/index-user.component';
import { LoginComponent } from './Views/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HomeComponent } from './Views/home/home.component';
import { IndexLocationComponent } from './Views/Location/index-location/index-location.component';
import { ShowTripeComponent } from './Views/show-tripe/show-tripe.component';
const routes: Routes = [
  { path: 'login' , component: LoginComponent},
  { path: 'home' , component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'car' , component: IndexCarComponent , canActivate: [AuthGuard]},
  { path: 'car/add' , component: AddCarComponent , canActivate: [AuthGuard]},
  { path: 'car/edit' , component: EditCarComponent , canActivate: [AuthGuard]},
  { path: 'typecar' , component: IndexTypeCarComponent , canActivate: [AuthGuard]},
  { path: 'familycar' , component: IndexFamilyCarComponent , canActivate: [AuthGuard]},
  { path: 'user' , component: IndexUserComponent , canActivate: [AuthGuard]},
  { path: 'user/add' , component: AddUserComponent , canActivate: [AuthGuard]},
  { path: 'user/edit/:id' , component: EditUserComponent , canActivate: [AuthGuard]},
  { path: 'listrips' , component: IndexLocationComponent , canActivate: [AuthGuard] },
  { path: 'showtrip/:id_user/:loc_id' , component: ShowTripeComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
