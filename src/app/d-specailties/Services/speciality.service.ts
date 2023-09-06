import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { APIService } from 'src/app/Shared/Services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  dataSource :any;
  specialityForm! :FormGroup
  deletedId! : number;
  updatedId! : number;
  selectedSpeciality : any;
  formSubmitted = false;

  constructor(private api : APIService) { }

  prepareUpdateForm(id:number) {
    this.updatedId = id;

    this.api.getAllItem(`specialties?_id=${this.updatedId}`).subscribe(data => {
      this.selectedSpeciality = data.Data;

      console.log(this.selectedSpeciality[0])

      this.specialityForm.patchValue({
        speciality: this.selectedSpeciality[0].speciality,
      })

    })
  }
}
