import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListAppointmentComponent } from './Components/list-appointment/list-appointment.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AddConfirmComponent } from './Components/add-edit-appointment/add-confirm/add-confirm.component';
import { UpdateConfirmComponent } from './Components/update-appointment/update-confirm/update-confirm.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DeleteAppointmentComponent } from './Components/delete-appointment/delete-appointment.component';
import { UpdateAppointmentComponent } from './Components/update-appointment/update-appointment.component';
import { SharedModule } from './Components/shared/shared.module';
import { AddAppointmentComponent } from './Components/add-edit-appointment/add-appointment.component';





@NgModule({
  declarations: [
    ListAppointmentComponent,
    AddAppointmentComponent,
    AddConfirmComponent,
    DeleteAppointmentComponent,
    UpdateAppointmentComponent,
    UpdateConfirmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSnackBarModule,
    SharedModule
  ],
  exports: [
    ListAppointmentComponent,
  ]
})
export class DAppointmentsModule { }