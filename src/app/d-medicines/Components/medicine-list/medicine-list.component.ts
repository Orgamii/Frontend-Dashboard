import { AfterViewInit, Component, OnChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MedicineService } from '../../Services/medicine.service';
import { AddEditMedicineComponent } from '../add-edit-medicine/add-edit-medicine.component';
import { DeleteMedicineComponent } from '../delete-medicine/delete-medicine.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateMedicineComponent } from '../update-medicine/update-medicine.component';
import { AddConfirmationComponent } from '../add-edit-medicine/add-confirmation/add-confirmation.component';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements AfterViewInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource : any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'name','description','edit','delete'];

  constructor(
    private api:APIService,private _dialoge : MatDialog,
    public _medicineService:MedicineService,
    // public _dialogRef:MatDialogRef<AddConfirmationComponent>
    ) {}
  
  ngAfterViewInit(): void {
    this.getMedicineList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openAddMedicineForm(){
     const dialogRef = this._dialoge.open(AddEditMedicineComponent);
     dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if (val) {
          this.getMedicineList();
        }
      }
    })


  }
  
  openUpdateMedicineForm(id:number){
    this._medicineService.prepareUpdateForm(id)
    this._dialoge.open(UpdateMedicineComponent)
  }

  remove(id: number) {
    this._medicineService.deletedId = id;
    this._dialoge.open(DeleteMedicineComponent);
  }



  getMedicineList(){
    this.api.getAllItem("medicines").subscribe((data: any) => {
      // this.dataSource = new MatTableDataSource(data.Data);
      this._medicineService.dataSource = data.Data;
      this.dataSource = new MatTableDataSource<any>(this._medicineService.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
