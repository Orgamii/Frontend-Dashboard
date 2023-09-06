import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { APIService } from 'src/app/Shared/Services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  dataSource: any;
  medicineForm!: FormGroup;
  deletedId! : number;
  updatedId! : number;
  selectedMedicine : any;
  formSubmitted = false;
  
  constructor(private api : APIService) { }

  prepareUpdateForm(id:number) {
    this.updatedId = id;

    this.api.getAllItem(`medicines?_id=${this.updatedId}`).subscribe(data => {
      this.selectedMedicine = data.Data;

      console.log(this.selectedMedicine[0])

      this.medicineForm.patchValue({
        _id : this.selectedMedicine[0]._id,
        name: this.selectedMedicine[0].name,
        description: this.selectedMedicine[0].description,
      })

    })
  }

}
