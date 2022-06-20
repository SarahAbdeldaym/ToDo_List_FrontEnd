import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../models/Todo';
import { UpdateTodoRequest } from '../requests/update-todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {

  @Input() todo: Todo | null = null;
  @Output() todoUpdated: EventEmitter<Todo | null> = new EventEmitter();

  title = new FormControl();
  body = new FormControl();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.title = new FormControl(this.todo?.title);
    this.body = new FormControl(this.todo?.body);
  }

  save() {
    if (!this.todo?.id) {
      // There's no todo to update!!
      this.todoUpdated.emit(null);
      return;
    }

    var updateTodoRequest: UpdateTodoRequest = {};

    if (this.todo?.title != this.title.value) {
      updateTodoRequest.title = this.title.value;
    }

    if (this.todo?.body != this.body.value) {
      updateTodoRequest.body = this.body.value;
    }

    if (Object.values(updateTodoRequest).length) {
      // At least one property updated.
      this.todoService.updateTodo(this.todo?.id, updateTodoRequest).subscribe(res => {
        this.todo = res.data;
        this.todoUpdated.emit(this.todo!);
      });
    } else {
      this.todoUpdated.emit(null);
    }
  }
}
