import { TestResult } from './../../models/test-result';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-result-view',
  templateUrl: './test-result-view.component.html',
  styleUrls: ['./test-result-view.component.scss']
})
export class TestResultViewComponent implements OnInit {

  testResult: TestResult;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: {testResult: TestResult}) => {
      this.testResult = data.testResult;
      console.log(this.testResult);
    });
  }

}
