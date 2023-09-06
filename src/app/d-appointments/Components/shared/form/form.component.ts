import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApppointmentService } from 'src/app/d-appointments/Services/appointment.service';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  clinicsLocations: any;
  doctorNames: any;
  times:string[] = [
    "7:30 am",
    "9:30 am",
    "11:30 am",
    "1:30 pm",
    "3:30 pm",
    "5:30 pm",
    "7:30 pm",
  ]
  constructor(private sharedService: APIService, private fb: FormBuilder, public appointmentService: ApppointmentService) {
    this.appointmentService.appoinForm = fb.group({
      doctor: ['',Validators.required],
      clinic: ['',Validators.required],
      date: ['',Validators.required],
      timeFrom: ['',Validators.required],
      timeTo: ['',Validators.required]
    })
  }


  get doctor() {
    return this.appointmentService.appoinForm.get('doctor');
  }
  get clinic() {
    return this.appointmentService.appoinForm.get('clinic');
  }
  get date() {
    return this.appointmentService.appoinForm.get('date');
  }
  get timeFrom() {
    return this.appointmentService.appoinForm.get('timeFrom');
  }
  get timeTo() {
    return this.appointmentService.appoinForm.get('timeTo');
  }



  ngOnInit(): void {
    this.sharedService.getAllItem("clinics").subscribe(data => {
      this.clinicsLocations = data.Data;
    }, err => {
      alert("wrong")
    })

    this.sharedService.getAllItem("doctors").subscribe(data => {
      this.doctorNames = data.Data;
    })
  }
}
