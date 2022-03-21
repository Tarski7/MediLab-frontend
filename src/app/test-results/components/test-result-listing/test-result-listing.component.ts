import { MatSnackBar } from '@angular/material/snack-bar';
import { TestResult } from './../../models/test-result';
import { TestResultService } from './../../services/test-result.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { remove } from 'lodash';
import { PageEvent } from '@angular/material/paginator';

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
  resultsLength = 0;
  _page = 0;
  _perPage = 10;
  isResultsLoading = false;

  ngOnInit(): void {
    this.populateTestResults();
  }

  onPageChanged(event: PageEvent) {
    this.isResultsLoading = true;
    this._page = event.pageIndex;
    this._perPage = event.pageSize;
    this.testResultService.getTestResults({
        page: ++event.pageIndex,
        perPage: event.pageSize})
        .subscribe(data => {
          this.dataSource = data.docs;
          this.resultsLength = data.total;
          this.isResultsLoading = false;
        }, err => this.errorHandler(err, 'Failed to fetch test results'));
  }

  private populateTestResults() {
    this.isResultsLoading = true;
    this.testResultService.getTestResults({page: 1, perPage: 10}).subscribe(data => {
      this.dataSource = data.docs;
      this.resultsLength = data.total;
    }, err => this.errorHandler(err, 'Failed to fetch test results'), () => {
      this.isResultsLoading = false;
    });
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
    this.isResultsLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
