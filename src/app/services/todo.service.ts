import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateTodoRequest } from '../requests/update-todo';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:8000/api/todos';

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<any> {
    return this.httpClient.get(this.baseUrl, { headers: this.headers() });
  }

  createTodo(todo: Todo): Observable<any> {
    return this.httpClient.post(this.baseUrl, todo, { headers: this.headers() });
  }

  updateTodo(todoId: number, request: UpdateTodoRequest): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/' + todoId, request, { headers: this.headers() });
  }

  markTodoAsDone(todoId: number): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/' + todoId + '/' + 'mark-as-done', {}, { headers: this.headers() });
  }

  reopenTodo(todoId: number): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/' + todoId + '/' + 'reopen', {}, { headers: this.headers() });
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/' + todoId, { headers: this.headers() });
  }

  private headers() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
      'Accept': 'application/json'
    };
  }
 }
