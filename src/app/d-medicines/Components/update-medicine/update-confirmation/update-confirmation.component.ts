import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicineService } from 'src/app/d-medicines/Services/medicine.service';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-update-confirmation',
  templateUrl: './update-confirmation.component.html',
  styleUrls: ['./update-confirmation.component.scss']
})
export class UpdateConfirmationComponent {

  constructor(private _dialog : MatDialog,private medicineService:MedicineService, private api:APIService, private snackBar:MatSnackBar){}

  confirmUpdate(){

    console.log(this.medicineService.medicineForm.value);

    this.api.updateItem(`medicines/${this.medicineService.updatedId}`,this.medicineService.medicineForm.value).subscribe(data=>{
      //close update dialoge
      this._dialog.closeAll();
      //refreshing the table
      this.api.getAllItem("medicines").subscribe(data=>{
        this.medicineService.dataSource = data.Data;
        });
      //alert
      this.snackBar.open(`Medicine has been updated successfully!`, 'ok', {
        duration: 3000,
        verticalPosition: 'top'
      });

    },
    err=>{
      console.log("failed");
    })

  }

}
