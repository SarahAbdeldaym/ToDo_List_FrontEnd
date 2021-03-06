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
import { RegisterComponent } from './register/register.component';
import {PasswordModule} from 'primeng/password';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {CheckboxModule} from 'primeng/checkbox';
import { LoginComponent } from './login/login.component';
import {ButtonModule} from 'primeng/button';
import { TodoFormComponent } from './todo-form/todo-form.component';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    CoverComponent,
    RegisterComponent,
    LoginComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    PickListModule,
    DialogModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PasswordModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
