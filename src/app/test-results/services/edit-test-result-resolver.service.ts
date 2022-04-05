import { TestResultService } from './test-result.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TestResult } from '../models/test-result';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditTestResultResolverService implements Resolve<TestResult> {

  constructor(private testResultService: TestResultService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TestResult> {
    let id = route.paramMap.get('id');
    return this.testResultService.getTestResult(id).pipe(take(1), map(testResult => {
      if (testResult) {
        console.log('testResult')
        return testResult;
      }
      else {
        console.log('navigate')
        this.router.navigate(['/dashboard', 'test-results']);
        return null;
      }
    }));
  }
}
