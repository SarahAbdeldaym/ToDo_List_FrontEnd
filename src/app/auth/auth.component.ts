import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('auth-token')) {
      return;
    }

    this.userService.profile().subscribe(
      result => this.user = result.data
    )
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.user = null;
    this.router.navigate([ '/login' ]);
  }

}
