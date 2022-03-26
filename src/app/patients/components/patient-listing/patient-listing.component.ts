import { Patient } from './../../models/patient';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patient-listing',
  templateUrl: './patient-listing.component.html',
  styleUrls: ['./patient-listing.component.scss']
})
export class PatientListingComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'pesel', 'email', 'phoneNo'];
  dataSource = new MatTableDataSource<Patient>();

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      this.dataSource.data = data;
    }, err => console.log(err));
  }

  saveBtnHandler() {

  }
}
