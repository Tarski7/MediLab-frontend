import { TestResultService } from './../../services/test-result.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-result-form',
  templateUrl: './test-result-form.component.html',
  styleUrls: ['./test-result-form.component.scss']
})
export class TestResultFormComponent implements OnInit {

  testResultForm: FormGroup;

  constructor(private fb: FormBuilder,
    private testResultService: TestResultService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.testResultForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      description: ''
    });
  }

  onSubmit() {
    this.testResultService.createTestResult(this.testResultForm.value)
      .subscribe(data => {
        this.testResultForm.reset();
      }, err => {
        console.error(err);
      });
  }
}
