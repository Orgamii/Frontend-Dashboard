import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/Shared/Services/api.service';
import { SpecialityService } from '../../Services/speciality.service';
import { AddSpecialityComponent } from '../add-speciality/add-speciality.component';
import { UpdateSpecialityComponent } from '../update-speciality/update-speciality.component';
import { SpecialityListItem } from './speciality-list-datasource';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})
export class SpecialityListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SpecialityListItem>;
  dataSource:   MatTableDataSource<SpecialityListItem>;
  ;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name' , 'edit'];

  constructor
  (
    private api:APIService,private _dialoge : MatDialog,
    public _specialityService:SpecialityService,
  )
  {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getSpecialityList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //----------------------------------------------------------

  openAddSpecialityForm(){
    const dialogRef = this._dialoge.open(AddSpecialityComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if (val) {
          this.getSpecialityList();
        }
      }
    })
  }
  openUpdateSpecialityForm(id:number){
    this._specialityService.prepareUpdateForm(id)
    this._dialoge.open(UpdateSpecialityComponent)
  }

  //----------------------------------------------------------
  getSpecialityList(){
    this.api.getAllItem("specialties").subscribe((data: any) => {
      this._specialityService.dataSource = data.Data;
      this.dataSource = new MatTableDataSource<any>(this._specialityService.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
