import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/Models/user/user.module';
import { UserService } from 'src/app/Services/user.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {
  users: UserModule[];
  constructor(
    private userService: UserService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser(): void {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.userService.deleteUser(id).subscribe(
      response => {
        console.log(response);
        this.getAllUser();
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
