import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
