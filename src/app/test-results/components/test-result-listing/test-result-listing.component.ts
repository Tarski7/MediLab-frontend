import { MatSnackBar } from '@angular/material/snack-bar';
import { TestResult } from './../../models/test-result';
import { TestResultService } from './../../services/test-result.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remove } from 'lodash';

@Component({
  selector: 'app-test-results-listing',
  templateUrl: './test-result-listing.component.html',
  styleUrls: ['./test-result-listing.component.scss']
})
export class TestResultListingComponent implements OnInit {

  constructor(private testResultService: TestResultService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['name', 'date', 'price', 'description', 'action'];
  dataSource: TestResult[] = [];

  ngOnInit(): void {
    this.testResultService.getTestResults().subscribe(data => {
      this.dataSource = data;
    }, err => this.errorHandler(err, 'Failed to fetch test results'));
  }

  saveBtnHandler() {
    this.router.navigate(['dashboard', 'test-results', 'new']);
  }

  deleteBtnHandler(id) {
    this.testResultService.deleteTestResult(id).subscribe(data => {
      const removedItem = remove(this.dataSource, (item) => {
        return item._id === data._id
      });
      this.dataSource = [...this.dataSource];
      this.snackBar.open('Test result deleted', 'Success', {
        duration: 2000
      });
    }, err => this.errorHandler(err, 'Failed to delete test result'));
  }

  editBtnHandler(id) {
    this.router.navigate(['dashboard', 'test-results', id]);
  }

  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
