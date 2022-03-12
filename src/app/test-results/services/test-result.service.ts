import { TestResult, TestResultPaginationRsp } from './../models/test-result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  constructor(private httpClient: HttpClient) { }

  getTestResults({page, perPage}): Observable<TestResultPaginationRsp> {
    return this.httpClient.get<TestResultPaginationRsp>(`${BASE_URL}/test-results?page=${page}&perPage=${perPage}`);
  }

  createTestResult(body: TestResult): Observable<TestResult> {
    return this.httpClient.post<TestResult>(`${BASE_URL}/test-results`, body);
  }

  deleteTestResult(id: string): Observable<TestResult> {
    return this.httpClient.delete<TestResult>(`${BASE_URL}/test-results/${id}`);
  }

  getTestResult(id: string): Observable<TestResult> {
    return this.httpClient.get<TestResult>(`${BASE_URL}/test-results/${id}`);
  }

  updateTestResult(id: string, body: TestResult): Observable<TestResult> {
    return this.httpClient.put<TestResult>(`${BASE_URL}/test-results/${id}`, body);
  }
}
