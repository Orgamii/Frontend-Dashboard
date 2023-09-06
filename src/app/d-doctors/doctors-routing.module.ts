import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent } from './Components/doctor-list/doctor-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ClinicsListComponent } from '../d-clinics/Components/clinics-list/clinics-list.component';

const routes: Routes = [
  { path: '', component: DoctorListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  bootstrap: [ClinicsListComponent]
})
export class DDoctorsRoutingModule { }
