import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/Shared/Services/api.service';
import { SpecialityService } from '../../Services/speciality.service';
import { UpdateConfirmationComponent } from './update-confirmation/update-confirmation.component';

@Component({
  selector: 'app-update-speciality',
  templateUrl: './update-speciality.component.html',
  styleUrls: ['./update-speciality.component.scss']
})
export class UpdateSpecialityComponent {
  
  
  constructor(
    private _formBuilder:FormBuilder,
    private api:APIService,
    private _dialoge:MatDialog,
    private specialityService:SpecialityService,

  ) {}



  openUpdateConfirmation(){
    // this.specialityService.formSubmitted = true;
    this._dialoge.open(UpdateConfirmationComponent)
  }
  closeDialog(){
    this._dialoge.closeAll()

  }
}
