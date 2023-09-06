import {Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, map, of } from 'rxjs';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import Swal from 'sweetalert2';
import { IClinic } from '../../Models/iclinic';
import { SubjectClinicsService } from '../../Services/subjectclinics.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  specailies!: any[];
  doctors: Observable<any[]> | undefined;
  choicedDoctorAsync: Observable<any[]> | undefined;
  isEmpty: boolean = true;
  targetSpecailty: number = 0;
  IdsOfSelectedDoctors: number[] = [];
  clinicForm!: FormGroup;

  constructor(private http: APIService, private fb: FormBuilder, private _dialog: MatDialog, private dataService: SubjectClinicsService, @Inject(MAT_DIALOG_DATA) public data: IClinic) {
    this.clinicForm = fb.group({
      location: fb.group({
        city: [data?.location.city || '', Validators.required],
        street: [data?.location.street || '', Validators.required],
        building: [data?.location.building || '', Validators.required],
      }),
      mobilePhone: [data?.mobilePhone || '', Validators.required],
      manager: [data?.manager || '']
    })
    if(this.data?.doctors.length > 0) {
      this.isEmpty = false;
      this.choicedDoctorAsync = of(this.data.doctors);
      this.data.doctors.forEach((doc) => {
        this.IdsOfSelectedDoctors.push(doc._id)
      })
    }
  }

  ngOnInit(): void {
    this.getAllSpecailties()
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

  getDoctorsBasedOnSpecailtyId(targetSpecailty: number) {
      let obvserver = {
        next: (data: any) => {
          this.doctors = of(data.Data);
          data.Data.length == 0 ? this.isEmpty = true : this.isEmpty = false
        },
        complete: () => {
          console.log("completed")
        },
        error: (error: Error) => {
          console.log(error);
        }
      }
      this.http.getAllItem(`doctors?specialty=${targetSpecailty}`).subscribe(obvserver)
  }

  selectedDoctor(targetDoctor:any) {
    let temp: any = {};
    temp._id = targetDoctor._id;
    temp.firstName = targetDoctor.firstName;
    temp.lastName = targetDoctor.lastName;
    temp.specialty = targetDoctor.specialty;
    if(this.IdsOfSelectedDoctors.findIndex(function(e) {
      return e == targetDoctor._id
    }) == -1) {
      this.IdsOfSelectedDoctors.push(targetDoctor._id);
      if(this.choicedDoctorAsync != undefined) {
        const newDoctor = this.choicedDoctorAsync?.pipe(
          map(arr => arr ? [...arr, temp] : [temp]) // check if arr is defined, if not initialize with [4]
        );
        this.choicedDoctorAsync = newDoctor;
      }
      else {
        this.choicedDoctorAsync = of([temp]);
      }
    }
  }

  remove(removeItem: any) {
    let targetIndex = this.IdsOfSelectedDoctors.indexOf(removeItem._id);
    if (targetIndex !== -1) {
      this.IdsOfSelectedDoctors.splice(targetIndex, 1);
    }
    const modifiedObservable = this.choicedDoctorAsync?.pipe(
      map((array: any) => array.filter((element: any) => element?._id !== removeItem._id))
    )
    this.choicedDoctorAsync = modifiedObservable;
  }

  add() {
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
          'New clinic is added successfully',
          'success'
        )
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    if(this.clinicForm.status == "VALID") {
      if (this.IdsOfSelectedDoctors.length != 0) {
        this.clinicForm.value.doctors = this.IdsOfSelectedDoctors
      }
      if(this.clinicForm.value.manager == '') {
        delete this.clinicForm.value.manager;
      }
      this.http.addItem("clinics", this.clinicForm.value).subscribe(obvserver)
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
    if(this.clinicForm.status == "VALID") {
      this.clinicForm.value.doctors = this.IdsOfSelectedDoctors
      if(this.clinicForm.value.manager == '') {
        delete this.clinicForm.value.manager;
      }
      this.http.updateItem(`clinics/${this.data._id}`, this.clinicForm.value).subscribe(obvserver)
    }
  }

  cancel() {
    this._dialog.closeAll();
  }

}
