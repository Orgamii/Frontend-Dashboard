import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostLoginComponent } from './post-login/post-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    PostLoginComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports:[
    PostLoginComponent, FormsModule, ReactiveFormsModule
  ]
})
export class LoginModule { }
