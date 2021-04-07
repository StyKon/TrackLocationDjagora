import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
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
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Cin: ['', Validators.required],
      NumTel: ['', Validators.required],
      NumPassport: ['', Validators.required],
      Password: ['', Validators.required],
      TypeUser: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.userService.addUser(this.submitForm.value).subscribe(res => {
      console.log(res);
      console.log('Conducteur created successfully!');
      this.router.navigate(['user']);
    });
  }

}
