import { Patient } from './../models/patient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${BASE_URL}/patients`);
  }

  createPatient(body: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(`${BASE_URL}/patients`, body);
  }
}
