import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FamilyCarService } from 'src/app/Services/family-car.service';
import { FamilyCarModule } from 'src/app/Models/family-car/family-car.module';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-index-family-car',
  templateUrl: './index-family-car.component.html',
  styleUrls: ['./index-family-car.component.css']
})
export class IndexFamilyCarComponent implements OnInit {
  fm = {
    familyCarId: 0,
    nameFamily: ''
};
  familyCars: FamilyCarModule[];
  submitForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private familyCarService: FamilyCarService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.getAllFamilyCar();
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.submitForm = this.formBuilder.group({
      NameFamily: ['', Validators.required],
    });
    if (!this.isAddMode) {
      this.familyCarService.getFamilyCarById(this.id)
          .pipe(first())
          .subscribe(x => this.submitForm.patchValue(x));
  }
  }
  get f() { return this.submitForm.controls; }
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.submitForm.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createFamilyCar();
    } else {
        this.updateFamilyCar();
    }
}
private editClick(familyCar: any){
 this.fm = familyCar;
 this.isAddMode = false;
}
private createFamilyCar() {
  this.familyCarService.addFamilyCar(this.submitForm.value)
      .pipe(first())
      .subscribe({
          next: () => {
            this.getAllFamilyCar();
          },
          error: error => {
              this.loading = false;
          }
      });
}
private updateFamilyCar() {
  this.submitForm.value['FamilyCarId'] = this.fm.familyCarId;
  this.familyCarService.editeFamilyCar(this.fm.familyCarId, this.submitForm.value)
      .pipe(first())
      .subscribe({
          next: () => {
            this.router.navigate(['familycar']);
          },
          error: error => {
              this.loading = false;
          }
      });
}
getAllFamilyCar(): void {
  this.familyCarService.getAllFamilyCar()
    .subscribe(
      data => {
        this.familyCars = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
public openConfirmationDialog(id: number) {
  this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
  .then((confirmed) => {
   if (confirmed === true){this.familyCarService.deleteFamilyCar(id).subscribe(
    response => {
      console.log(response);
      this.getAllFamilyCar();
    },
    error => {
      console.log(error);
    }); }
  }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}
}
