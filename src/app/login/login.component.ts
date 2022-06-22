import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';

  password: string = '';

  rememberMe: boolean = false;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') ?? '';
    this.password = localStorage.getItem('password') ?? '';
    this.rememberMe = (localStorage.getItem('rememberMe') ?? '0') == '1' ? true : false;
    this.userService.profile().subscribe(
      res => console.log(res)
    )
  }

  login(): void {
    this.userService.login({ email: this.email, password: this.password })
    .pipe(
      catchError((error: any): any => this.handleAuthenticationError(error))
    )
    .subscribe(result => {
      this.saveUserToken(result.data);
      this.router.navigate([ '/todos' ]);
    });
  }

  register(): void {
  }

  private saveUserToken(token: string): void {
    localStorage.setItem('auth-token', token);
    if (this.rememberMe) {

      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
      localStorage.setItem('rememberMe', '1');

    } else {

      localStorage.setItem('rememberMe', '0');

    }
  }

  private handleAuthenticationError(error: any): void {
    let errors = error.error.errors;
    if (422 == error.status) {
      let invalidInputs = Object.keys(errors);
      for (let index = 0; index < invalidInputs.length; index++) {
        let input = invalidInputs[index];
        this.toastrService.error(errors[input], 'Invalid input');
      }
    } else {
      this.toastrService.error(errors);
    }
  }
}
