import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { IClinic } from '../../Models/iclinic';
import { ClinicDetailsComponent } from '../clinic-details/clinic-details.component';
import Swal from 'sweetalert2';
import { ConfirmService } from '../../../Shared/Services/confirm.service';
import { FormComponent } from '../add-update-form/form.component';
import { SubjectClinicsService } from '../../Services/subjectclinics.service';

@Component({
  selector: 'app-clinics-list',
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.scss']
})

export class ClinicsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['city', 'street', 'building', 'mobilePhone', 'doctors', 'details', 'update', 'availability'];
  dataSource = new MatTableDataSource<IClinic>()
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  clinicData: IClinic[];
  dataFromDialog: any;
  constructor(private http: APIService, private _dialog: MatDialog, private dataService: SubjectClinicsService, private confirm: ConfirmService) {
    this.clinicData = [];
    this.getAllClinics()
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.dataFromDialog = data;
      for (let i = 0; i < data.length; i++) {
        data[i].city = data[i].location.city;
        data[i].building = data[i].location.building;
        data[i].street = data[i].location.street;
      }
      let index = this.clinicData.findIndex(function(item) {
        return item._id == data[0]._id;
      })
      if(index == -1) {
        this.clinicData.push(data[0])
      }
      else {
        this.clinicData[index] = data[0];
      }
      this.dataSource = new MatTableDataSource<IClinic>(this.clinicData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openAddClinicForm() {
    this._dialog.open(FormComponent);
  }

  openDetialsClinic(target: IClinic) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = target;
    this._dialog.open(ClinicDetailsComponent, dialogConfig);
  }

  openUpdateClinicForm(target: IClinic) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = target;
    this._dialog.open(FormComponent, dialogConfig)
  }

  getAllClinics() {
    let obvserver = {
      next: (data: any) => {
        for (let i = 0; i < data.Data.length; i++) {
          data.Data[i].city = data.Data[i].location.city;
          data.Data[i].building = data.Data[i].location.building;
          data.Data[i].street = data.Data[i].location.street;
        }
        this.clinicData = data.Data;
        this.dataSource = new MatTableDataSource<IClinic>(this.clinicData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      complete: () => {
        console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }

    this.http.getAllItem("clinics").subscribe(obvserver);
  }

  block(row: any, input: any) {
    if(!input.checked) {
      let target = {
        message: "Are you sure to block this clinic?",
        method: () => {
          this.http.updateItem(`clinics/admin/${row._id}`, {availability: false}).subscribe((data) => {
            input.checked = false;
            Swal.fire(
              'Blocked!',
              'The clinic has been blocked successfully',
              'success'
            )
          })
        },
        element: input
      }
      this.confirm.confirm(target);
    }
    else {
      this.http.updateItem(`clinics/admin/${row._id}`, {availability: true}).subscribe((data) => {
        Swal.fire(
          'Available!',
          'The clinic is available now',
          'success'
        )
      })
      input.checked = true;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
