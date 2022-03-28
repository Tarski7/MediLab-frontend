import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from './../../services/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-form-dialog',
  templateUrl: './patient-form-dialog.component.html',
  styleUrls: ['./patient-form-dialog.component.scss']
})
export class PatientFormDialogComponent implements OnInit {

  patientForm: FormGroup;
  title = 'New patient';

  constructor(public dialogRef: MatDialogRef<PatientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private patientService: PatientService,
    private snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initPatientForm();
    if (this.data && this.data.patientId) {
      this.setPatientToForm(this.data.patientId);
    }
  }

  private setPatientToForm(patientId) {
    this.title = 'Edit patient';
    this.patientService.getPatient(patientId).subscribe(patient => {
      this.patientForm.patchValue(patient);
    }, err => this.errorHandler(err, 'Failed to load patient'))
  }

  private initPatientForm() {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      pesel: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });
  }

  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
