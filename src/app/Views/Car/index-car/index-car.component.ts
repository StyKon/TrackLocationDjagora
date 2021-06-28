import { Component, OnInit } from '@angular/core';
import { CarModule } from 'src/app/Models/car/car.module';
import { CarService } from 'src/app/Services/car.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-index-car',
  templateUrl: './index-car.component.html',
  styleUrls: ['./index-car.component.css']
})
export class IndexCarComponent implements OnInit {

  cars: CarModule[];

  constructor(private carService: CarService,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllCar();
  }
  getAllCar(): void {
    this.carService.getAllCar()
      .subscribe(
        data => {
          this.cars = data;
        },
        error => {
          console.log(error);
        });
  }
public openConfirmationDialog(id: number) {
  this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
  .then((confirmed) => {
   if (confirmed === true){this.carService.deleteCar(id).subscribe(
    response => {
      this.getAllCar();
    },
    error => {
      console.log(error);
    }); }
  }).catch(() => console.log('Car dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}
}
