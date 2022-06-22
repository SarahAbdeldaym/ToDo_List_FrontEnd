import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, scan } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string = '';

  email: string = '';

  password: string = '';

  confirmPassword: string ='';

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  signup() {
    if (this.password != this.confirmPassword) {
      this.toastrService.error("Password and confirm password don't match.");
      return;
    }
    this.userService.signup({
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirmPassword
    }).pipe(
      catchError((error: any): any => this.handleRegistrationError(error))
    ).subscribe(result => this.toastrService.info('User has been created.'));
  }

  private handleRegistrationError(error: any): void {
    if (422 == error.status) {
      let errors = error.error.errors;
      let invalidInputs = Object.keys(errors);
      for (let index = 0; index < invalidInputs.length; index++) {
        let input = invalidInputs[index];
        this.toastrService.error(errors[input], 'Invalid input');
      }
    }
  }
}
