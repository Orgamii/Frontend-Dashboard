import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClinicsListComponent } from './Components/clinics-list/clinics-list.component';

const routes: Routes = [
  { path: '', component: ClinicsListComponent }
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
export class ClincRoutingModule { }
