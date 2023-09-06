import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MedicineService } from '../../Services/medicine.service';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss']
})
export class MedicineFormComponent {
  medicineForm!:FormGroup;
  constructor(
    private _formBuilder:FormBuilder,
    private api:APIService,
    private _dialoge:MatDialog,
    public _medicineService:MedicineService
  ) 
  {
    
    this._medicineService.medicineForm= _formBuilder.group({
      name:['',[Validators.required,Validators.min(4)]],
      description:['',[Validators.required]]
    })

    this.medicineForm = this._medicineService.medicineForm;
    console.log()

    this.medicineForm.get('name')
  
  }

}
