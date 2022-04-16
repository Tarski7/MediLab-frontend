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

  getTestResults({page, perPage, sortField, sortDir, filter}): Observable<TestResultPaginationRsp> {
    let queryString = `${BASE_URL}/test-results?page=${page}&perPage=${perPage}`;
    if (sortField && sortDir) {
      queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
    }
    if (filter) {
      queryString = `${queryString}&filter=${filter}`;
    }

    return this.httpClient.get<TestResultPaginationRsp>(queryString);
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

  downloadTestResult(id: string) {
    return this.httpClient.get(`${BASE_URL}/test-results/${id}/download`, {
      responseType: 'blob'
    });
  }
}
