import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../requests/login';
import { SignupRequest } from '../requests/signup';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/users';

  constructor(private httpClient: HttpClient) { }

  signup(request: SignupRequest): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/signup', request);
  }

  login(request: LoginRequest): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/login', request);
  }

  profile(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/me', { headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
    } });
  }
}
