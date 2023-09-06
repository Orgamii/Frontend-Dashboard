import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialityFormComponent } from './speciality-form/speciality-form.component';



@NgModule({
  declarations: [
    SpecialityFormComponent
  ],
  imports: [
    CommonModule,
    SpecialityFormComponent
  ],exports:[
    SpecialityFormComponent
  ]
})
export class SharedModule { }
