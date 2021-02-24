import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCarComponent } from './Views/add-car/add-car.component';
import { AddFamilyCarComponent } from './Views/add-family-car/add-family-car.component';
import { AddLocationComponent } from './Views/add-location/add-location.component';
import { AddTypeCarComponent } from './Views/add-type-car/add-type-car.component';
import { AddUserComponent } from './Views/add-user/add-user.component';
import { EditCarComponent } from './Views/edit-car/edit-car.component';
import { EditFamilyCarComponent } from './Views/edit-family-car/edit-family-car.component';
import { EditLocationComponent } from './Views/edit-location/edit-location.component';
import { EditTypeCarComponent } from './Views/edit-type-car/edit-type-car.component';
import { EditUserComponent } from './Views/edit-user/edit-user.component';
import { IndexCarComponent } from './Views/index-car/index-car.component';
import { IndexFamilyCarComponent } from './Views/index-family-car/index-family-car.component';
import { IndexLocationComponent } from './Views/index-location/index-location.component';
import { IndexTypeCarComponent } from './Views/index-type-car/index-type-car.component';
import { IndexUserComponent } from './Views/index-user/index-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent,
    AddFamilyCarComponent,
    AddLocationComponent,
    AddTypeCarComponent,
    AddUserComponent,
    EditCarComponent,
    EditFamilyCarComponent,
    EditLocationComponent,
    EditTypeCarComponent,
    EditUserComponent,
    IndexCarComponent,
    IndexFamilyCarComponent,
    IndexLocationComponent,
    IndexTypeCarComponent,
    IndexUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
