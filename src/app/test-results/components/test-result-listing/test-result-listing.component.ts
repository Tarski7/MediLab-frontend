import { TestResult } from './../../models/test-result';
import { TestResultService } from './../../services/test-result.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-results-listing',
  templateUrl: './test-result-listing.component.html',
  styleUrls: ['./test-result-listing.component.scss']
})
export class TestResultListingComponent implements OnInit {

  constructor(private testResultService: TestResultService,
    private router: Router) { }

  displayedColumns: string[] = ['name', 'date', 'price', 'description', 'action'];
  dataSource: TestResult[] = [];

  ngOnInit(): void {
    this.testResultService.getTestResults().subscribe(data => {
      this.dataSource = data;
    }, err => {
      console.error(err);
    });
  }

  saveBtnHandler() {
    this.router.navigate(['dashboard', 'test-results', 'new']);
  }
}
