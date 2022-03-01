import { TestResultService } from './../../services/test-result.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-results-listing',
  templateUrl: './test-result-listing.component.html',
  styleUrls: ['./test-result-listing.component.scss']
})
export class TestResultListingComponent implements OnInit {

  constructor(private testResultService: TestResultService) { }

  ngOnInit(): void {
    this.testResultService.getTestResults().subscribe(data => {
      console.log(data);
    }, err => {
      console.error(err);
    });
  }

}
