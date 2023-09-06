import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IDoctor } from '../../Models/IDoctor';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubjectDoctorsService } from '../../Services/subject-doctors.service';
import { ConfirmService } from 'src/app/Shared/Services/confirm.service';
import { AddUpdateFormComponent } from '../add-update-form/add-update-form.component';
import { DoctorDetailsComponent } from '../doctor-details/doctor-details.component';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['SSN', 'firstName', 'lastName', 'specialty', 'age', 'image', 'details', 'update', 'availability'];
  dataSource = new MatTableDataSource<IDoctor>()
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  doctorData: IDoctor[];
  dataFromDialog: any;

  constructor(private http: APIService, private _dialog: MatDialog, private dataService: SubjectDoctorsService, private confirm: ConfirmService) {
    this.doctorData = [];
    this.getAllDoctors()
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.dataFromDialog = data;
      for (let i = 0; i < data.length; i++) {
        data[i].specialty = data[i].specialty.specialty;
        data[i].image = environment.APIURL + "/" + data[i].image
      }
      let index = this.doctorData.findIndex(function(item) {
        return item._id == data[0]._id;
      })
      if(index == -1) {
        this.doctorData.push(data[0])
      }
      else {
        this.doctorData[index] = data[0];
      }
      this.dataSource = new MatTableDataSource<IDoctor>(this.doctorData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openAddDoctorForm() {
    this._dialog.open(AddUpdateFormComponent);
  }

  openDetialsDoctor(target: IDoctor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = target;
    this._dialog.open(DoctorDetailsComponent, dialogConfig);
  }

  openUpdateDoctorForm(target: IDoctor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = target;
    this._dialog.open(AddUpdateFormComponent, dialogConfig)
  }

  getAllDoctors() {
    let obvserver = {
      next: (data: any) => {
        for (let i = 0; i < data.Data.length; i++) {
          data.Data[i].specialty = data.Data[i].specialty.specialty;
          data.Data[i].image = environment.APIURL + "/" + data.Data[i].image
        }
        this.doctorData = data.Data;
        this.dataSource = new MatTableDataSource<IDoctor>(this.doctorData);
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

    this.http.getAllItem("doctors").subscribe(obvserver);
  }

  block(row: any, input: any) {
    if(!input.checked) {
      let target = {
        message: "Are you sure to block this Doctor?",
        method: () => {
          this.http.updateItem(`doctors/admin/${row._id}`, {availability: false}).subscribe((data) => {
            input.checked = false;
            Swal.fire(
              'Blocked!',
              'The Doctor has been blocked successfully',
              'success'
            )
          })
        },
        element: input
      }
      this.confirm.confirm(target);
    }
    else {
      this.http.updateItem(`doctors/admin/${row._id}`, {availability: true}).subscribe((data) => {
        Swal.fire(
          'Available!',
          'The Doctor is available now',
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
