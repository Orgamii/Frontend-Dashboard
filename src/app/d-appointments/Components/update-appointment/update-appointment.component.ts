import { Component } from '@angular/core';
import { ApppointmentService } from '../../Services/appointment.service';
import { UpdateConfirmComponent } from './update-confirm/update-confirm.component';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss']
})
export class UpdateAppointmentComponent {
  constructor(public appointmentService: ApppointmentService) { }


  update(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.appointmentService.appoinForm.value.date = this.appointmentService.formatCalenderDate(this.appointmentService.appoinForm.value.date);
    this.appointmentService.dialog.open(UpdateConfirmComponent, { width: '250px', enterAnimationDuration, exitAnimationDuration });
  }


  close() {
    this.appointmentService.dialog.closeAll()
  }
}
