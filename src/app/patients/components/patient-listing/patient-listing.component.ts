import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientFormDialogComponent } from './../patient-form-dialog/patient-form-dialog.component';
import { Patient } from './../../models/patient';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-patient-listing',
  templateUrl: './patient-listing.component.html',
  styleUrls: ['./patient-listing.component.scss']
})
export class PatientListingComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'pesel', 'email', 'phoneNo', 'action'];
  dataSource = new MatTableDataSource<Patient>();
  isResultLoading = false;

  constructor(private patientService: PatientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isResultLoading = true;
    this.patientService.getPatients().subscribe(data => {
      this.dataSource.data = data;
    }, err => console.log(err),
    () => this.isResultLoading = false);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PatientFormDialogComponent, {
      width: '550px',
      height: '500px',
      data: {}
    });

    dialogRef.afterClosed().pipe(filter(patientParam => typeof patientParam === 'object')).subscribe(result => {
      return this.patientService.createPatient(result).subscribe(patient => {
        this.dataSource.data.push(patient);
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open('Patient created!', 'Success', {
          duration: 2000
        });
      }, err => this.errorHandler(err, 'Failed to create patient'));
    });
  }

  editBtnHandler(patientId) {

  }

  deleteBtnHandler(patientId) {

  }

  private errorHandler(error, message) {
    this.isResultLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
