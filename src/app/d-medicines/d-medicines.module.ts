import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MedicineListComponent } from './Components/medicine-list/medicine-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditMedicineComponent } from './Components/add-edit-medicine/add-edit-medicine.component';
import { AddConfirmationComponent } from './Components/add-edit-medicine/add-confirmation/add-confirmation.component';
import { MedicineFormComponent } from './shared/medicine-form/medicine-form.component';
import { DeleteMedicineComponent } from './Components/delete-medicine/delete-medicine.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateMedicineComponent } from './Components/update-medicine/update-medicine.component';
import { UpdateConfirmationComponent } from './Components/update-medicine/update-confirmation/update-confirmation.component';



@NgModule({
  declarations: [
    MedicineListComponent,
    AddEditMedicineComponent,
    AddConfirmationComponent,
    MedicineFormComponent,
    DeleteMedicineComponent,
    UpdateMedicineComponent,
    UpdateConfirmationComponent
  ],
  imports: [
    
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
    
  
  ],
  exports:[
    MedicineListComponent
  ],
})
export class DMedicinesModule { }
