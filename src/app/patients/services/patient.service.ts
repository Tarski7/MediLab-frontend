import { Patient } from './../models/patient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private HttpClient: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.HttpClient.get<Patient[]>(`${BASE_URL}/patients`);
  }
}
