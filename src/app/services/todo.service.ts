import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:8000/api/todos';

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

}
