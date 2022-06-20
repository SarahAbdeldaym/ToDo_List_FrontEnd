import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  public pendingTodos: Todo[] = [];
  public doneTodos: Todo[] = [];
  public visibleTodo: Todo | null = null;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  public updateTodos(): void {
    this.doneTodos.forEach(todo => todo.is_done = true);
    this.pendingTodos.forEach(todo => todo.is_done = false);
  }

  public showDetails(todo: Todo) {
    this.visibleTodo = todo;
  }



  public isVisible(todo: Todo): boolean {
    return todo.title == this.visibleTodo?.title;
  }

    private getTodos(): void {
      this.todoService.getTodos().subscribe(
        res => {
          let todos = res.data.data;
          this.doneTodos = todos.filter((todo: Todo) => todo.is_done);
          this.pendingTodos = todos.filter((todo: Todo) => ! todo.is_done);
        }
      )
  }

}
