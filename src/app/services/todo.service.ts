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
    return this.httpClient.get(this.baseUrl, { headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
    } });
  }

  createTodo(todo: Todo): Observable<any> {
    return this.httpClient.post(this.baseUrl, todo, { headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
    } });
  }

  updateTodo(todoId: number, request: UpdateTodoRequest): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/' + todoId, request, { headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
    } });
  }

  markTodoAsDone(todoId: number): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/' + todoId + '/' + 'mark-as-done', {}, { headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
    } });
  }

  reopenTodo(todoId: number): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/' + todoId + '/' + 'reopen', {}, { headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
    } });
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/' + todoId);
  }
 }
