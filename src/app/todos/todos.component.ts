import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Todo } from '../models/Todo';
import { UpdateTodoRequest } from '../requests/update-todo';
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  public pendingTodos: Todo[] = [];
  public doneTodos: Todo[] = [];
  public visibleTodo: Todo | null = null;
  public updatedTodo: Todo | null = null;
  public isAddingTodo: boolean = false;

  public isUserAuthenticated: boolean = false;

  constructor(private todoService: TodoService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getTodos();
    this.userService.profile().subscribe(result => this.isUserAuthenticated = true);
  }

  public updateTodosCompletion(): void {
    this.doneTodos.forEach((todo) => (todo.is_done = true));
    this.pendingTodos.forEach((todo) => (todo.is_done = false));
  }

  public completeTodos(): void {
    this.doneTodos.forEach((todo: Todo) => {
      if (!todo.is_done && todo.id) {
        this.todoService.markTodoAsDone(todo.id).subscribe(() => todo.is_done = true)
      }
    });
  }

  public reopenTodos(): void {
    this.pendingTodos.forEach((todo: Todo) => {
      if (todo.is_done && todo.id) {
        this.todoService.reopenTodo(todo.id).subscribe(() => todo.is_done = false)
      }
    });
  }

  public showDetails(todo: Todo) {
    this.visibleTodo = todo;
  }

  public isVisible(todo: Todo): boolean {
    return todo.title == this.visibleTodo?.title;
  }

  public updateTodo(todo: Todo) {
    this.updatedTodo = todo;
  }

  public refreshTodo(todo: Todo) {
    var updateTodoRequest: UpdateTodoRequest = {};

    updateTodoRequest.title = todo.title;
    updateTodoRequest.body = todo.body;

    if (Object.values(updateTodoRequest).length) {
      // At least one property updated.
      this.todoService.updateTodo(todo.id ?? 0, updateTodoRequest).subscribe(res => {
        todo = res.data;
        this.getTodos();
        this.updatedTodo = null;
      });
    }
  }

  public deleteTodo(todo: Todo) {
    if (!todo.id) {
      return;
    }

    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.doneTodos = this.doneTodos.filter(t => t.id != todo.id);
      this.pendingTodos = this.pendingTodos.filter(t => t.id != todo.id);
    });
  }

  public openTodoForm(): void {
    this.isAddingTodo = true;
  }

  public addTodo(todo: Todo): void {
    this.todoService.createTodo(todo)
    .pipe(catchError((error: any): any => {
      this.isAddingTodo = false;
    }))
    .subscribe(result => {
      this.isAddingTodo = false;
      this.getTodos();
    })
  }

  public logout(): void {
    localStorage.removeItem('auth-token');
    this.router.navigate([ '/login' ]);
  }

  private getTodos(): void {
    this.todoService.getTodos().subscribe((res) => {
      let todos = res.data.data;
      this.doneTodos = todos.filter((todo: Todo) => todo.is_done);
      this.pendingTodos = todos.filter((todo: Todo) => !todo.is_done);
    });
  }
}
