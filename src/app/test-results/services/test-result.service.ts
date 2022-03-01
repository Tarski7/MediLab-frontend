import { TestResult } from './../models/test-result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  constructor(private httpClient: HttpClient) { }

  getTestResults(): Observable<TestResult[]> {
    return this.httpClient.get<TestResult[]>(`${BASE_URL}/test-results`);
  }
}