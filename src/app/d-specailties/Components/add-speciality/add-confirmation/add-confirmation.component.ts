import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialityService } from 'src/app/d-specailties/Services/speciality.service';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-add-confirmation',
  templateUrl: './add-confirmation.component.html',
  styleUrls: ['./add-confirmation.component.scss']
})
export class AddConfirmationComponent {
  constructor(
    public _specialityService:SpecialityService,
    private api:APIService,
    private _dialogRef : MatDialogRef<AddConfirmationComponent>,
    private _dialog : MatDialog,
    private snackBar:MatSnackBar
  ){}

  confirm(){
    if (this._specialityService.specialityForm.valid) {
      console.log(this._specialityService.specialityForm.value)

      this.api.addItem("specialties",this._specialityService.specialityForm.value).subscribe(data=>{
        console.log(data);

        //refreshing the table
        this.api.getAllItem("specialties").subscribe(data=>{
          this._specialityService.dataSource = data.Data;
         });
         //alert
        this.snackBar.open(`speciality has been Added successfully!`, 'ok', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      error=>{
        console.log("error")
      })

      this._dialog.closeAll()

    }
  }
}
