import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  @Input() todo: Todo | null = null;

  @Output() onSave: EventEmitter<Todo> = new EventEmitter();

  title: FormControl = new FormControl();

  body: FormControl = new FormControl();

    get saveButtonText(): string {
    return this.todo ? 'Update Todo' : 'Create Todo';
  }

  constructor() { }

  ngOnInit(): void {
    if (this.todo) {
      this.title = new FormControl(this.todo.title);
      this.body = new FormControl(this.todo.body);
    }
  }

  save(): void {
    let title = this.title.value;
    let body = this.body.value;

    if (!title || !body) {
      return;
    }

    let todo = this.todo ?? { title: '', body: '', is_done: false };

    if (0 < title.length) {
      todo.title = this.title.value;
    }

    if (0 < body.length) {
      todo.body = this.body.value;
    }

    this.onSave.emit(todo);
  }
}
