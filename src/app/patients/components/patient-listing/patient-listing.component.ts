import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientFormDialogComponent } from './../patient-form-dialog/patient-form-dialog.component';
import { Patient } from './../../models/patient';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { remove } from 'lodash';

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

  openDialog(patientId: string): void {
    const options = {
      width: '550px',
      height: '500px',
      data: {}
    };

    if (patientId) {
      options.data = {patientId: patientId}
    }

    const dialogRef = this.dialog.open(PatientFormDialogComponent, options);

    dialogRef.afterClosed().pipe(filter(patientParam => typeof patientParam === 'object')).subscribe(result => {
      if (patientId) {
        return this.patientService.updatePatient(patientId, result).subscribe(patient => {
          const index = this.dataSource.data.findIndex(patient => patient._id === patientId);
          this.dataSource.data[index] = patient;
          this.dataSource.data = [...this.dataSource.data];
          this.snackBar.open('Patient updated!', 'Success', {
            duration: 2000
          });
        }, err => this.errorHandler(err, 'Failed to update patient'))
      }
      else {
        return this.patientService.createPatient(result).subscribe(patient => {
          this.dataSource.data.push(patient);
          this.dataSource.data = [...this.dataSource.data];
          this.snackBar.open('Patient created!', 'Success', {
            duration: 2000
          });
        }, err => this.errorHandler(err, 'Failed to create patient'));
      }
    });
  }

  deleteBtnHandler(patientId) {
    this.patientService.deletePatient(patientId).subscribe(data => {
      const removeItems = remove(this.dataSource.data, item => {
        return item._id === data._id;
      });
      this.dataSource.data = [...this.dataSource.data];

      this.snackBar.open('Patient deleted', 'Success', {
        duration: 2000
      });
    }, err => this.errorHandler(err, 'Failed to delete patient'));
  }

  private errorHandler(error, message) {
    this.isResultLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
