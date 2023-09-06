import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ApppointmentService } from 'src/app/d-appointments/Services/appointment.service';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './update-confirm.component.html',
  styleUrls: ['./update-confirm.component.scss']
})
export class UpdateConfirmComponent {
  constructor(public appointmentService: ApppointmentService, private sharedService: APIService, private snackBar: MatSnackBar) { }
  confirm() {
    console.log(this.appointmentService.appoinForm.value);
    this.sharedService.updateItem(`appointments/${this.appointmentService.updatedId}`, this.appointmentService.appoinForm.value).subscribe(data => {
      this.appointmentService.dialog.closeAll();
      this.snackBar.open(`Appointment has been updated successfully!`, 'ok', {
        duration: 3000,
        verticalPosition: 'top'
      });

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
      })



    }, err => {
      this.snackBar.open(`There is a problem, Please try again!`, 'ok', {
        duration: 3000,
        verticalPosition: 'top'
      });;
    })

  }
}
