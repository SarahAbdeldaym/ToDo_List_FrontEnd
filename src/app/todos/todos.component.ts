import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/todo.service';

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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
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

  public refreshTodo(todo: Todo | null) {
    this.updatedTodo = null;

    if (!todo) {
      return;
    }

    for (let index = 0; index < this.doneTodos.length; index++) {
      let _todo = this.doneTodos[index];
      if (todo.id == _todo.id) {
        this.doneTodos[index] = todo;
        break;
      }
    }

    for (let index = 0; index < this.pendingTodos.length; index++) {
      let _todo = this.pendingTodos[index];
      if (todo.id == _todo.id) {
        this.pendingTodos[index] = todo;
        break;
      }
    }
  }

  private getTodos(): void {
    this.todoService.getTodos().subscribe((res) => {
      let todos = res.data.data;
      this.doneTodos = todos.filter((todo: Todo) => todo.is_done);
      this.pendingTodos = todos.filter((todo: Todo) => !todo.is_done);
    });
  }
}
