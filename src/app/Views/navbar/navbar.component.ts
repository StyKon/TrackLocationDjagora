import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/Models/user/user.module';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
  }
  logOut() {
    this.tokenService.signOut();
    this.router.navigate(['login']);
  }
}
