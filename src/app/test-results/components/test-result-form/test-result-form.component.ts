import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-result-form',
  templateUrl: './test-result-form.component.html',
  styleUrls: ['./test-result-form.component.scss']
})
export class TestResultFormComponent implements OnInit {

  testResultForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.testResultForm = this.fb.group({
      name: '',
      date: '',
      price: '',
      description: ''
    });
  }
}
