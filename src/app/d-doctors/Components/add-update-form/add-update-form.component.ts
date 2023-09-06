import { Component, Inject, OnInit } from '@angular/core';
import { IDoctor } from '../../Models/IDoctor';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import Swal from 'sweetalert2';
import { Observable, map, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { SubjectDoctorsService } from '../../Services/subject-doctors.service';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-update-form',
  templateUrl: './add-update-form.component.html',
  styleUrls: ['./add-update-form.component.scss']
})

export class AddUpdateFormComponent implements OnInit {
  specailies!: any[];
  clinics!: any[];
  choicedClinicAsync: Observable<any[]> | undefined;
  isEmpty: boolean = true;
  IdsOfSelectedClinics: number[] = [];
  doctorForm!: FormGroup;
  addressForm!: FormGroup;
  matcher: any;
  constructor(private http: APIService, private fb: FormBuilder, private _dialog: MatDialog, private dataService: SubjectDoctorsService, @Inject(MAT_DIALOG_DATA) public data: IDoctor) {
    this.doctorForm = fb.group({
      SSN: new FormControl('', [Validators.required, Validators.pattern(/^(?:2|3)\d{13}$/)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]),
      age: new FormControl('', [Validators.required, Validators.min(25), Validators.max(60)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      specialty: new FormControl('', [Validators.required]),
      clinic: new FormControl('', [Validators.required]),
    })

    this.addressForm = fb.group({
      city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{6,15}$/)]),
      street: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{4,20}$/)]),
      building: new FormControl('', [Validators.required]),
  })

    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
    this.getAllSpecailties();
    this.GetAllClinics();
  }

  CheckSSN(value: any) {
    this.http.getAllItem(`users?SSN=${value}`).subscribe(data => {
      if(data.Data.length > 0) {
        this.doctorForm.get("SSN")?.setErrors({"isFound": true})
      }
    });
  }

  CheckPhone(value: any) {
    this.http.getAllItem(`doctors?phone=${value}`).subscribe(data => {
      if(data.Data.length > 0) {
        this.doctorForm.get("phone")?.setErrors({"isFound": true})
      }
    });
  }

  checkEmail(value: any) {
    this.http.getAllItem(`users?email=${value}`).subscribe(data => {
      if(data.Data.length > 0) {
        this.doctorForm.get("email")?.setErrors({"isFound": true})
      }
    });
  }

  getAllSpecailties() {
    let obvserver = {
      next: (data: APIResponseVM) => {
        this.specailies = data.Data;
      },
      complete: () => {
        console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    this.http.getAllItem("specialties").subscribe(obvserver)
  }

  GetAllClinics() {
    let obvserver = {
      next: (data: APIResponseVM) => {
        this.clinics = data.Data;
      },
      complete: () => {
        console.log("All clinics are downloaded")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    this.http.getAllItem("clinics").subscribe(obvserver)
  }

  add() {
    this.doctorForm.value.address = this.addressForm.value
    let password = this.doctorForm.value.firstName.toLowerCase() + this.doctorForm.value.lastName.toLowerCase() +  Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    this.doctorForm.value.password = password
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data.Success) {
          this.dataService.setData(data.Data);
        }
      },
      complete: () => {
        this._dialog.closeAll();
        Swal.fire(
          'Added!',
          'New doctor is added successfully',
          'success'
        )
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    if(this.doctorForm.status == "VALID") {
      this.http.addItem("doctors", this.doctorForm.value).subscribe(obvserver)
    }
  }

  update() {
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data.Success) {
          // fix refresh the page after updating
          // location.reload();
          this.http.getAllItem(`clinics/${this.data._id}`).subscribe((response) => {
            this.dataService.setData(response.Data);
          })
        }
      },
      complete: () => {
        this._dialog.closeAll();
        Swal.fire(
          'Updated!',
          'The clinic is updated successfully',
          'success'
        )
      },
      error: (error: Error) => {

      }
    }
    if(this.doctorForm.status == "VALID") {
      this.doctorForm.value.doctors = this.IdsOfSelectedClinics
      if(this.doctorForm.value.manager == '') {
        delete this.doctorForm.value.manager;
      }
      this.http.updateItem(`clinics/${this.data._id}`, this.doctorForm.value).subscribe(obvserver)
    }
  }

  cancel() {
    this._dialog.closeAll();
  }
}
