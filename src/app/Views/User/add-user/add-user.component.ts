import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModule } from 'src/app/Models/user/user.module';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  submitForm: FormGroup;
  loading = false;
  user: UserModule;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() !== true) {
      this.router.navigate(['login']);
    }
    this.user = this.tokenService.getUser();
    this.submitForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Cin: ['', Validators.required],
      NumTel: ['', Validators.required],
      NumPassport: ['', Validators.required],
      Password: ['', Validators.required],
      TypeUser: ['', Validators.required],
      createdByAdminID: this.user['userId'],
    });
  }
  onSubmit(): void {
    this.userService.addUser(this.submitForm.value).subscribe(res => {
      console.log(res);
      console.log('Conducteur created successfully!');
      this.router.navigate(['user']);
    });
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
  ConducteurValid() {
    if (this.user['typeUser'] === 'User') {
      return true;
    }
    return false;

  }

}
