import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IClinic } from '../../Models/iclinic';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss']
})
export class ClinicDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IClinic) {
  }
}
