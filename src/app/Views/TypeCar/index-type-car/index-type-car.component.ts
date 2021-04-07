import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TypeCarService } from 'src/app/Services/type-car.service';
import { TypeCarModule } from 'src/app/Models/type-car/type-car.module';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-index-type-car',
  templateUrl: './index-type-car.component.html',
  styleUrls: ['./index-type-car.component.css']
})
export class IndexTypeCarComponent implements OnInit {
  tp = {
    typeCarId: 0,
    nameType: ''
};
  typeCars: TypeCarModule[];
  submitForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private typeCarService: TypeCarService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.getAllTypeCar();
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.submitForm = this.formBuilder.group({
      NameType: ['', Validators.required],
    });
    if (!this.isAddMode) {
      this.typeCarService.getTypeCarById(this.id)
          .pipe(first())
          .subscribe(x => this.submitForm.patchValue(x));
  }
  }
  private editClick(typeCar: any){
    this.tp = typeCar;
    this.isAddMode = false;
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
        this.createTypeCar();
    } else {
        this.updateTypeCar();
    }
}
private createTypeCar() {
  this.typeCarService.addTypeCar(this.submitForm.value).subscribe(res => {
    this.getAllTypeCar();
  });
}
private updateTypeCar() {
  this.submitForm.value['TypeCarId'] = this.tp.typeCarId;
  this.typeCarService.editeTypeCar(this.tp.typeCarId, this.submitForm.value)
      .pipe(first())
      .subscribe({
          next: () => {
            this.tp.nameType = '';
              this.getAllTypeCar();
              this.isAddMode = true;
          },
          error: error => {
              this.loading = false;
          }
      });
}
getAllTypeCar(): void {
  this.typeCarService.getTypeCars()
    .subscribe(
      data => {
        this.typeCars = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
public openConfirmationDialog(id: number) {
  this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
  .then((confirmed) => {
   if (confirmed === true){this.typeCarService.deleteTypeCar(id).subscribe(
    response => {
      console.log(response);
      this.getAllTypeCar();
    },
    error => {
      console.log(error);
    }); }
  }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}

}
