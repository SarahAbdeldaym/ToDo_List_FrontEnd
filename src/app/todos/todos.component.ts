import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  private todos: Todo[] = [
    {
      title: "todo title",
      body: "the body",
      is_done: false
    },
    {
      title: "done todo title",
      body: "the complete body",
      is_done: true
    }
  ];

  public pendingTodos: Todo[] = [];
  public doneTodos: Todo[] = [];
  public visibleTodo: Todo | null = null;

  constructor() { }

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
    this.doneTodos = this.todos.filter(todo => todo.is_done);
    this.pendingTodos = this.todos.filter(todo => ! todo.is_done);
  }

}
