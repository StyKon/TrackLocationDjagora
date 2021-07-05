import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCarComponent } from './Views/Car/add-car/add-car.component';
import { EditCarComponent } from './Views/Car/edit-car/edit-car.component';
import { IndexCarComponent } from './Views/Car/index-car/index-car.component';
import { IndexFamilyCarComponent } from './Views/FamilyCar/index-family-car/index-family-car.component';
import { EditFamilyCarComponent } from './Views/FamilyCar/edit-family-car/edit-family-car.component';
import { AddFamilyCarComponent } from './Views/FamilyCar/add-family-car/add-family-car.component';
import { AddLocationComponent } from './Views/Location/add-location/add-location.component';
import { EditLocationComponent } from './Views/Location/edit-location/edit-location.component';
import { IndexLocationComponent } from './Views/Location/index-location/index-location.component';
import { IndexTypeCarComponent } from './Views/TypeCar/index-type-car/index-type-car.component';
import { AddTypeCarComponent } from './Views/TypeCar/add-type-car/add-type-car.component';
import { EditTypeCarComponent } from './Views/TypeCar/edit-type-car/edit-type-car.component';
import { EditUserComponent } from './Views/User/edit-user/edit-user.component';
import { AddUserComponent } from './Views/User/add-user/add-user.component';
import { IndexUserComponent } from './Views/User/index-user/index-user.component';
import { FooterComponent } from './Views/footer/footer.component';
import { NavbarComponent } from './Views/navbar/navbar.component';
import { LeftbarComponent } from './Views/leftbar/leftbar.component';
import { ConfirmationDialogComponent } from './Views/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './Views/login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { ShowTripeComponent } from './Views/show-tripe/show-tripe.component';
import { HomeComponent } from './Views/home/home.component';
import { AuthGuard } from './_helpers/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent,
    EditCarComponent,
    IndexCarComponent,
    IndexFamilyCarComponent,
    EditFamilyCarComponent,
    AddFamilyCarComponent,
    AddLocationComponent,
    EditLocationComponent,
    IndexLocationComponent,
    IndexTypeCarComponent,
    AddTypeCarComponent,
    EditTypeCarComponent,
    EditUserComponent,
    AddUserComponent,
    IndexUserComponent,
    FooterComponent,
    NavbarComponent,
    LeftbarComponent,
    LoginComponent,
    ShowTripeComponent,
    HomeComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
