import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DPrescriptionsComponent } from './d-prescriptions/d-prescriptions.component';
import { DInvoicesComponent } from './d-invoices/d-invoices.component';
import { DReportsComponent } from './d-reports/d-reports.component';
import { DEmployeesComponent } from './d-employees/d-employees.component';
import { DPatientsComponent } from './d-patients/d-patients.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DAppointmentsModule } from './d-appointments/d-appointments.module';
import { InterceptorService } from './Shared/Services/interceptor.service';
import { LoginModule } from './login/login.module';
import { DClinicsModule } from "./d-clinics/d-clinics.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { OutlineComponent } from './outline/outline.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DMedicinesModule } from './d-medicines/d-medicines.module';
import { DSpecailtiesModule } from './d-specailties/d-specailties.module';

@NgModule({
    declarations: [
        AppComponent,
        DPrescriptionsComponent,
        DInvoicesComponent,
        DReportsComponent,
        DEmployeesComponent,
        DPatientsComponent,
        OutlineComponent,
    ],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }],
    bootstrap: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        CommonModule,
        HttpClientModule,
        DAppointmentsModule,
        DMedicinesModule,
        DSpecailtiesModule,
        LoginModule,
        DClinicsModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTreeModule,
        DragDropModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        ],
    exports: [
      RouterModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule
    ]
})
export class AppModule { }
