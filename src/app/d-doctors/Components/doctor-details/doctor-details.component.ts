import { Component, Inject } from '@angular/core';
import { IDoctor } from '../../Models/IDoctor';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent {
  constructor(private http: APIService, @Inject(MAT_DIALOG_DATA) public data: IDoctor) {
    this.http.getAllItem(`users?userId=${this.data._id}&role=doctor`).subscribe(res => {
      for(let result of res.Data) {
        this.data.email = result["email"];
      }
      console.log(this.data)
    })
  }
}
