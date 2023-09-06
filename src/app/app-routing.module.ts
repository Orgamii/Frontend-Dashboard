import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAppointmentComponent } from './d-appointments/Components/list-appointment/list-appointment.component';
import { ClinicsListComponent } from './d-clinics/Components/clinics-list/clinics-list.component';
import { DEmployeesComponent } from './d-employees/d-employees.component';
import { DInvoicesComponent } from './d-invoices/d-invoices.component';
import { MedicineListComponent } from './d-medicines/Components/medicine-list/medicine-list.component';
import { DNotFoundComponent } from './D-NotFound/D-NotFound.component';
import { DPatientsComponent } from './d-patients/d-patients.component';
import { DPrescriptionsComponent } from './d-prescriptions/d-prescriptions.component';
import { DReportsComponent } from './d-reports/d-reports.component';
import { SpecialityListComponent } from './d-specailties/Components/speciality-list/speciality-list.component';
import { PostLoginComponent } from './login/post-login/post-login.component';
import { DoctorListComponent } from './d-doctors/Components/doctor-list/doctor-list.component';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full' },
  {
    path: "clinics",
    loadChildren: () => import('../app/d-clinics/d-clinics.module').then(m => m.DClinicsModule),
    component: ClinicsListComponent
  },
  {
    path: "doctors",
    loadChildren: () => import('../app/d-doctors/d-doctors.module').then(m => m.DDoctorsModule),
    component: DoctorListComponent
  },
  { path: "patients", component: DPatientsComponent },
  { path: "employees", component: DEmployeesComponent },
  {
    path: "medicines", component: MedicineListComponent
  },
  { path: "specailties", component: SpecialityListComponent },
  { path: "prescriptions", component: DPrescriptionsComponent },
  {
    path: "appointments", component: ListAppointmentComponent
  },
  { path: "invoices", component: DInvoicesComponent },
  { path: "reports", component: DReportsComponent },
  { path: "login", component: PostLoginComponent },
  {path: "**", component: DNotFoundComponent},
]

@NgModule(
  {
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
  }
)
export class AppRoutingModule { }
