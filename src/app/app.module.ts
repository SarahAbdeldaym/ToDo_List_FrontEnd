import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { CoverComponent } from './todos/cover/cover.component';
import {PickListModule} from 'primeng/picklist';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { UpdateTodoComponent } from './update-todo/update-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    CoverComponent,
    UpdateTodoComponent
  ],
  imports: [
    BrowserModule,
    PickListModule,
    DialogModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
