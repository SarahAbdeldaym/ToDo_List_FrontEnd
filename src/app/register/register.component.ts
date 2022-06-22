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

  rememberMe: boolean = false;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name') ?? '';
    this.email = localStorage.getItem('email') ?? '';
    this.rememberMe = (localStorage.getItem('rememberMe') ?? '0') == '1' ? true : false;
  }

  signup() {
    if (this.password != this.confirmPassword) {
      this.toastrService.error("Password and confirm password don't match.");
      return;
    }

    if (this.rememberMe) {
      this.remeberUserCredentials(this.name, this.email);
      localStorage.setItem('rememberMe', '1');
    } else {
      localStorage.setItem('rememberMe', '0');
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
    } else {
      this.toastrService.info('User has been created.');
    }
  }

  private remeberUserCredentials(name: string, email: string): void {
    if (0 < name.length) {
      localStorage.setItem('name', name);
    }

    if (0 < email.length) {
      localStorage.setItem('email', email);
    }
  }
}
