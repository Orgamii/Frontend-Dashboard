import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicineService } from 'src/app/d-medicines/Services/medicine.service';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-add-confirmation',
  templateUrl: './add-confirmation.component.html',
  styleUrls: ['./add-confirmation.component.scss']
})
export class AddConfirmationComponent {

  constructor(
    public _medicineService:MedicineService,
    private api:APIService,
    private _dialogRef : MatDialogRef<AddConfirmationComponent>,
    private _dialog : MatDialog,
    private snackBar:MatSnackBar
  ){}

  confirm(){
    if (this._medicineService.medicineForm.valid) {
      this.api.addItem("medicines",this._medicineService.medicineForm.value).subscribe(data=>{
        //refreshing the table
        this.api.getAllItem("medicines").subscribe(data=>{
          this._medicineService.dataSource = data.Data;
         });
         //alert
        this.snackBar.open(`Medicine has been Added successfully!`, 'ok', {
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
