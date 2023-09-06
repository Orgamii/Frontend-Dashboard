import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MedicineService } from '../../Services/medicine.service';

@Component({
  selector: 'app-delete-medicine',
  templateUrl: './delete-medicine.component.html',
  styleUrls: ['./delete-medicine.component.scss']
})
export class DeleteMedicineComponent {
  constructor(private api: APIService, private snackBar: MatSnackBar, public medicineService: MedicineService) { }

  confirm() {
    this.api.deleteItem(`medicines/${this.medicineService.deletedId}`).subscribe(data => {
      //refreshing the table 
      this.api.getAllItem("medicines").subscribe(data=>{
        this.medicineService.dataSource = data.Data;
      });
      //alert
      this.snackBar.open(`Medicine has been deleted successfully!`, 'ok', {
        duration: 3000,
        verticalPosition: 'top'
      });
    })  
  }

}
