import { MatSnackBar } from '@angular/material/snack-bar';
import { TestResultService } from './../../services/test-result.service';
import { TestResult } from './../../models/test-result';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-test-result-view',
  templateUrl: './test-result-view.component.html',
  styleUrls: ['./test-result-view.component.scss']
})
export class TestResultViewComponent implements OnInit {

  testResult: TestResult;
  isResultsLoading = false;

  constructor(private route: ActivatedRoute,
    private testResultService: TestResultService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: {testResult: TestResult}) => {
      this.testResult = data.testResult;
      console.log(this.testResult);
    });
  }

  downloadHandler(id) {
    this.isResultsLoading = true;
    this.testResultService.downloadTestResult(id).subscribe(data => {
       saveAs(data, this.testResult.name);
    }, err => {
      this.errorHandler(err, 'Error while downloading test result');
    }, () => {
      this.isResultsLoading = false
    });
  }

  private errorHandler(error, message) {
    console.error(error);
    this.isResultsLoading = false;
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
