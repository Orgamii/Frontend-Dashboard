import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApppointmentService } from '../../Services/appointment.service';
import { DeleteAppointmentComponent } from '../delete-appointment/delete-appointment.component';
import { UpdateAppointmentComponent } from '../update-appointment/update-appointment.component';
import { AddAppointmentComponent } from '../add-edit-appointment/add-appointment.component';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.scss']
})
export class ListAppointmentComponent implements OnInit {
  constructor(private _dialog: MatDialog,
    private sharedService: APIService,
    private snackBar: MatSnackBar,
    public appointmentService: ApppointmentService) { }

  ngOnInit(): void {
    this.initializeAppointmentData();
  }

  initializeAppointmentData() {
    this.sharedService.getAllItem("appointments").subscribe((data: any) => {
      for (let i = 0; i < data.Data.length; i++) {
        data.Data[i].city = data.Data[i].clinic.location.city;
        data.Data[i].doctorName = data.Data[i].doctor.firstName + " " + data.Data[i].doctor.lastName;
        data.Data[i].patientName = data.Data[i].patient?.firstName + " " + data.Data[i].patient?.lastName;
        if (data.Data[i].patientName.split(" ")[0] == "undefined") {
          data.Data[i].patientName = "-";
        }
      }
      this.appointmentService.appointments = new MatTableDataSource(data.Data);
      this.appointmentService.appointments.sort = this.sort;
      this.appointmentService.appointments.paginator = this.paginator;
    })
  }

  openAddAppointmentForm() {
    this._dialog.open(AddAppointmentComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.appointmentService.appointments.filter = filterValue.trim().toLowerCase();

    if (this.appointmentService.appointments.paginator) {
      this.appointmentService.appointments.paginator.firstPage();
    }
  }

  remove(id: number) {
    this.appointmentService.deletedId = id;
    this._dialog.open(DeleteAppointmentComponent);
  }

  update(id: number) {
    this.appointmentService.prepareUpdateForm(id);
    this._dialog.open(UpdateAppointmentComponent);
  }

  displayedColumns: string[] = ['Doctor', 'Clinic', 'Date', 'Starts', 'Ends', 'Status', 'Patient', 'Edit', 'Delete'];
  appointments: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

}
