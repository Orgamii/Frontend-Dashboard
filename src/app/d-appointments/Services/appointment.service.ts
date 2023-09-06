import { Injectable, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/Shared/Services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ApppointmentService {

  constructor(private diaglog: MatDialog, private sharedService: APIService) { }
  deletedId: number = 0;
  updatedId: number = 0;
  appointments: any;
  updatedAppointment: any;
  dialog = this.diaglog;
  appoinForm!: FormGroup;

  formatCalenderDate(date: Date) {
    return date.getDate()
      + "/" + (date.getMonth() + 1)
      + "/" + date.getFullYear()
  }

  formatForPatchForm(date: string) {
    return date.split('/').reverse().join('-');
  }

  prepareUpdateForm(id: number) {
    this.updatedId = id;
    this.sharedService.getAllItem(`appointments?_id=${this.updatedId}`).subscribe(data => {
      this.updatedAppointment = data.Data;
      console.log(this.updatedAppointment[0])
      this.appoinForm.patchValue({
        doctor: this.updatedAppointment[0].doctor._id,
        clinic: this.updatedAppointment[0].clinic._id,
        date: new Date(this.formatForPatchForm(this.updatedAppointment[0].date)),
        timeFrom: this.updatedAppointment[0].timeFrom,
        timeTo: this.updatedAppointment[0].timeTo
      })
    })
  }
}
