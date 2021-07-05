import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModule } from 'src/app/Models/user/user.module';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { UserService } from 'src/app/Services/user.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {
  users: UserModule[];
  user: UserModule;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() !== true) {
      this.router.navigate(['login']);
    }
    this.user = this.tokenService.getUser();
    if (this.user['typeUser'] === 'SuperUser') {
      this.getAllUserManagerForSuperUser(this.user['userId'], 'UserManager');
    } else {
      this.getAllDriversForUserManager(this.user['userId'], 'User');
    }
    // this.getAllUser();
  }
  getAllDriversForUserManager(userId: number, typeUser: string) {
    this.userService.getAllDriversForUserManager(userId, typeUser)
      .subscribe(
        data => {
          this.users = data;
        },
        error => {
          // tslint:disable-next-line:no-console
          console.log(error);
        });
  }
  getAllUserManagerForSuperUser(userId: number, typeUser: string) {
    this.userService.getAllUserManagerForSuperUser(userId, typeUser)
      .subscribe(
        data => {
          this.users = data;
          // tslint:disable-next-line:no-console
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  // getAllUser(): void {
  //   this.userService.getUsers()
  //     .subscribe(
  //       data => {
  //         this.users = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.userService.deleteUser(id).subscribe(
      response => {
        console.log(response);
        if (this.user['typeUser'] === 'SuperUser') {
          this.getAllUserManagerForSuperUser(this.user['userId'], 'UserManager');
        } else {
          this.getAllDriversForUserManager(this.user['userId'], 'User');
        }
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  SuperUserValid() {
    if (this.user['typeUser'] === 'SuperUser') {
      return true;
    }
    return false;
  }
  UserManagerValid() {
    if (this.user['typeUser'] === 'UserManager') {
      return true;
    }
    return false;
  }
}
