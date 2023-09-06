import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MedicineService } from '../../Services/medicine.service';
import { UpdateConfirmationComponent } from './update-confirmation/update-confirmation.component';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.scss']
})
export class UpdateMedicineComponent {


  constructor(
    private _formBuilder:FormBuilder,
    private api:APIService,
    private _dialoge:MatDialog,
    private medicineService:MedicineService,

  ) {}



  openUpdateConfirmation(){
    this.medicineService.formSubmitted = true;
    this._dialoge.open(UpdateConfirmationComponent)
  }
  closeDialog(){
    this._dialoge.closeAll()

  }

}
