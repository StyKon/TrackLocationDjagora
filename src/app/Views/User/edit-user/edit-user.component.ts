import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModule } from 'src/app/Models/user/user.module';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: UserModule;
  submitForm: FormGroup;
  loading = false;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      UserId: this.route.snapshot.params.id,
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Cin: ['', Validators.required],
      NumTel: ['', Validators.required],
      NumPassport: ['', Validators.required],
      Password: ['', Validators.required],
      TypeUser: ['', Validators.required],
    });
    this.getUser();
  }
  onSubmit(): void {
    this.userService.updateUser(this.route.snapshot.params.id, this.submitForm.value).subscribe(res => {
      console.log(res);
      console.log('User updated successfully!');
      this.router.navigate(['user']);
    });
  }
  getUser(): void {
    this.userService.getUserById(this.route.snapshot.params.id).subscribe(
      data => {
        this.user = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
}
