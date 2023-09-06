import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialityService } from 'src/app/d-specailties/Services/speciality.service';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-update-confirmation',
  templateUrl: './update-confirmation.component.html',
  styleUrls: ['./update-confirmation.component.scss']
})
export class UpdateConfirmationComponent {
  constructor
  (
    private _dialog : MatDialog,
    private specialityService:SpecialityService,
     private api:APIService,
      private snackBar:MatSnackBar
  ){}

  confirmUpdate(){

    console.log(this.specialityService.specialityForm.value);

    this.api.updateItem(`specialties/${this.specialityService.updatedId}`,this.specialityService.specialityForm.value).subscribe(data=>{
      //close update dialoge
      this._dialog.closeAll();
      //refreshing the table
      this.api.getAllItem("specialties").subscribe(data=>{
        this.specialityService.dataSource = data.Data;
        });
      //alert
      this.snackBar.open(`specialties has been updated successfully!`, 'ok', {
        duration: 3000,
        verticalPosition: 'top'
      });

    },
    err=>{
      console.log("failed");
    })

  }
}
