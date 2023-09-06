import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MedicineService } from '../../Services/medicine.service';
import { AddConfirmationComponent } from './add-confirmation/add-confirmation.component';

@Component({
  selector: 'app-add-edit-medicine',
  templateUrl: './add-edit-medicine.component.html',
  styleUrls: ['./add-edit-medicine.component.scss']
})
export class AddEditMedicineComponent {

  constructor(
    private _formBuilder:FormBuilder,
    private api:APIService,
    private _dialoge:MatDialog,
    private _dialogeRef:MatDialogRef<AddConfirmationComponent>,
    private medicineService:MedicineService,
  ) {}


  openAddConfirmation(){
    this.medicineService.formSubmitted = true;
    if(this.medicineService.medicineForm.invalid){
      alert('invalid')
    }else{
      this._dialoge.open(AddConfirmationComponent);
    }
  }

}
