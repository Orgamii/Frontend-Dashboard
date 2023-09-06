import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialityListComponent } from './Components/speciality-list/speciality-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DeleteSpecialityComponent } from './Components/delete-speciality/delete-speciality.component';
import { AddSpecialityComponent } from './Components/add-speciality/add-speciality.component';
import { AddConfirmationComponent } from './Components/add-speciality/add-confirmation/add-confirmation.component';
import { SpecialityFormComponent } from './Shared/speciality-form/speciality-form.component';
import { UpdateSpecialityComponent } from './Components/update-speciality/update-speciality.component';
import { UpdateConfirmationComponent } from './Components/update-speciality/update-confirmation/update-confirmation.component';



@NgModule({
  declarations: [
    SpecialityListComponent,
    DeleteSpecialityComponent,
    AddSpecialityComponent,
    AddConfirmationComponent,
    SpecialityFormComponent,
    UpdateSpecialityComponent,
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
    SpecialityListComponent
  ],
  bootstrap:[
    SpecialityListComponent
  ]
})
export class DSpecailtiesModule { }
