import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/Shared/Services/api.service';
import { SpecialityService } from '../../Services/speciality.service';

@Component({
  selector: 'app-speciality-form',
  templateUrl: './speciality-form.component.html',
  styleUrls: ['./speciality-form.component.scss']
})
export class SpecialityFormComponent {
  specialityForm!:FormGroup;
  constructor(
    private _formBuilder:FormBuilder,
    private api:APIService,
    private _dialoge:MatDialog,
    public _specialityService:SpecialityService
  ) 
  {
    
    this._specialityService.specialityForm= _formBuilder.group({
      specialty:['',[Validators.required,Validators.min(4)]],
    })

    this.specialityForm = this._specialityService.specialityForm;
    console.log()

    this.specialityForm.get('specialty')
  
  }
}
