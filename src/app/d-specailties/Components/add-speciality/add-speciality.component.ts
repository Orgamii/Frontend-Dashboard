import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpecialityService } from 'src/app/d-specailties/Services/speciality.service';
import { APIService } from 'src/app/Shared/Services/api.service';
import { AddConfirmationComponent } from './add-confirmation/add-confirmation.component';

@Component({
  selector: 'app-add-speciality',
  templateUrl: './add-speciality.component.html',
  styleUrls: ['./add-speciality.component.scss']
})
export class AddSpecialityComponent {

  constructor(
    private _formBuilder:FormBuilder,
    private api:APIService,
    private _dialoge:MatDialog,
    private _dialogeRef:MatDialogRef<AddConfirmationComponent>,
    private _specialityService:SpecialityService,
  ) {}


  openAddConfirmation(){
    // this.medicineService.formSubmitted = true;
    if(this._specialityService.specialityForm.invalid){
      alert('invalid')
    }else{
      this._dialoge.open(AddConfirmationComponent);
    }
  }
}
