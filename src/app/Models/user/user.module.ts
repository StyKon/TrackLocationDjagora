import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  cin: string;
  numTel: string;
  numPassport: string;
  password: string;
  typeUser: string;
}
