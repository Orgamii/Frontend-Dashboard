import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/Shared/Services/api.service';
import { ApppointmentService } from '../../../Services/appointment.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './add-confirm.component.html',
  styleUrls: ['./add-confirm.component.scss']
})
export class AddConfirmComponent {
  constructor(private appointmentService:ApppointmentService,
  private sharedService:APIService,
  private snackBar:MatSnackBar){}
  confirm(){
    console.log(this.appointmentService.appoinForm.value);
    this.sharedService.addItem("appointments", this.appointmentService.appoinForm.value).subscribe(data=>{
      this.snackBar.open(`Appointment has been added successfully!`, 'ok', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.sharedService.getAllItem("appointments").subscribe((data: any) => {
        for (let i = 0; i < data.Data.length; i++) {
          data.Data[i].city = data.Data[i].clinic.location.city; 
          data.Data[i].doctorName = data.Data[i].doctor.firstName+" "+data.Data[i].doctor.lastName;
          data.Data[i].patientName = data.Data[i].patient?.firstName+" "+data.Data[i].patient?.lastName;
          if(data.Data[i].patientName.split(" ")[0] == "undefined"){
            data.Data[i].patientName = "-";
          }
        }
        this.appointmentService.appointments = new MatTableDataSource(data.Data);
      })
      this.appointmentService.dialog.closeAll();
    },err=>{
      this.snackBar.open(`There is a problem, Please try again!`, 'ok', {
        duration: 3000,
        verticalPosition: 'top'
      });
    })

  }
}
