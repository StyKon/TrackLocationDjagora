import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModule } from 'src/app/Models/user/user.module';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  user: UserModule;
  // tslint:disable-next-line:ban-types
  username: String;
  constructor(private authService: AuthService,
              private router: Router,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() !== true) {
      this.router.navigate(['login']);
    }
    this.user = this.tokenService.getUser();
    // tslint:disable-next-line:quotemark
    this.username = this.user['username'];
  }
  SuperUserValid() {
    // tslint:disable-next-line:no-conditional-assignment
    if (this.user['typeUser'] === 'SuperUser') {
      return true;
    }
    return false;
  }
  UserManagerValid() {
    // tslint:disable-next-line:no-conditional-assignment
    if (this.user['typeUser'] === 'UserManager') {
      return true;
    }
    return false;
  }
  ConducteurValid() {
    // tslint:disable-next-line:no-conditional-assignment
    if (this.user['typeUser'] === 'User') {
      return true;
    }
    return false;

  }
  logOut() {
    this.tokenService.signOut();
    this.router.navigate(['login']);
  }

}
