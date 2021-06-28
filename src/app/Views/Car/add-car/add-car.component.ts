import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModule } from 'src/app/Models/user/user.module';
import { CarService } from 'src/app/Services/car.service';
import { FamilyCarService } from 'src/app/Services/family-car.service';
import { TypeCarService } from 'src/app/Services/type-car.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  submitForm: FormGroup;
  users: any;
  familycars: any;
  typecars: any;
  constructor(
    private familyCarService: FamilyCarService,
    private typeCarService: TypeCarService,
    private userService: UserService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      NameCar: ['', Validators.required],
      Puissance: ['', Validators.required],
      NumberPlace: ['', Validators.required],
      Matricule: ['', Validators.required],
      DateCirculation: ['', Validators.required],
      TotKm: ['', Validators.required],
      FamilyCarId: ['', Validators.required],
      UserId: ['', Validators.required],
      TypeCarId: ['', Validators.required],
    });
    this.getAllUser();
    this.getAllFamilyCar();
    this.getAllTypeCar();
  }
  onSubmit(){
    this.carService.addCar(this.submitForm.value).subscribe((): void => {
       this.router.navigate(['car']);
      }, (err) => {
        console.log(this.submitForm.value);
        console.log(err);
    });
  }
  getAllFamilyCar(): void {
    this.familyCarService.getAllFamilyCar()
      .subscribe(
        data => {
          this.familycars = data;
        },
        error => {
          console.log(error);
        });
  }
  getAllTypeCar(): void {
    this.typeCarService.getTypeCars()
      .subscribe(
        data => {
          this.typecars = data;
        },
        error => {
          console.log(error);
        });
  }
  getAllUser(): void {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log(error);
        });
  }

}
