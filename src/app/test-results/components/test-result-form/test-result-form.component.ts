import { PatientService } from './../../../patients/services/patient.service';
import { Patient } from './../../../patients/models/patient';
import { TestResult } from './../../models/test-result';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResultService } from './../../services/test-result.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-result-form',
  templateUrl: './test-result-form.component.html',
  styleUrls: ['./test-result-form.component.scss']
})
export class TestResultFormComponent implements OnInit {

  testResultForm: FormGroup;
  private testResult: TestResult;
  patients: Patient[] = [];
  title = 'New test result';

  constructor(private fb: FormBuilder,
    private testResultService: TestResultService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService) { }

  ngOnInit(): void {
    this.createForm();
    this.setTestResultToForm();
    this.setPatients();
  }

  private createForm() {
    this.testResultForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      patient: ['', Validators.required],
      description: ''
    });
  }

  onSubmit() {
    if (this.testResult) {
      this.testResultService.updateTestResult(this.testResult._id, this.testResultForm.value)
        .subscribe(data => {
          this.snackBar.open('Test result updated', 'Success', {
            duration: 2000
          });
          this.router.navigate(['dashboard', 'test-results']);
        }, err => this.errorHandler(err, 'Failed to update test result'));
    }
    else {
      this.testResultService.createTestResult(this.testResultForm.value)
        .subscribe(data => {
          this.snackBar.open('Test result created', 'Success', {
            duration: 2000
          });
          this.router.navigate(['dashboard', 'test-results']);
        }, err => this.errorHandler(err, 'Failed to create test result'));
    }
  }

  private setTestResultToForm() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) {
        return;
      }

      this.title = 'Edit test result';
      this.route.data.subscribe((data: {testResult: TestResult}) => {
        this.testResult = data.testResult;
        this.testResultForm.patchValue(this.testResult);
      })
    });
  }

  private setPatients() {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    }, err => this.errorHandler(err, 'Failed to get patients'))
  }

  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
