import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineFormComponent } from './medicine-form/medicine-form.component';



@NgModule({
  declarations: [
    MedicineFormComponent
  ],
  imports: [
    CommonModule,
    MedicineFormComponent
  ],exports:[
    MedicineFormComponent
  ]
})
export class SharedModule { }
