import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css']
})
export class PatientPageComponent implements OnInit {

  patients: Patient[] = [new Patient()];
  patientId: Patient = new Patient();
  patientName : Patient = new Patient();
  hidden_all_patients: boolean = true;
  hidden_by_id: boolean = true;
  hidden_by_name: boolean = true;

  constructor(private service: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients = () => {
    // @ts-ignore
    this.service.getAllPatients().subscribe((res: any) => {
      this.patients = res},
      (err: any) => {
        console.error(err)
      }
    )
  }

  getPatientById = (id: HTMLInputElement) => {
    // @ts-ignore
    if (id.value == '') {
      if (!this.hidden_by_id) {
        this.hidden_by_id = true;
      }
      alert("Pas d'id renseigné");
    } else {
      this.service.getPatientById(id.value).subscribe((res:Patient) => {
        this.patientId = res},
        (err: any) => {
          console.error(err);
        }
      )
      if (this.hidden_by_id) {
        this.hidden_by_id = false;
      } 
      id.value = '';
    }
  }

  getPatientByName = (name: HTMLInputElement) => {
    if (name.value == '') {
      if (!this.hidden_by_name) {
        this.hidden_by_name = true;
      }
      alert("Pas de nom renseigné");
    } else {
      this.service.getPatientByName(name.value).subscribe((res: Patient) => {
        this.patientName = res},
        (err: any) => {
          console.error(err);
        }
      )
      if (this.hidden_by_name) {
        this.hidden_by_name = false;
      } 
      name.value='';
    }
  }

  

  toggleAllPatients(): void {
    this.hidden_all_patients = !this.hidden_all_patients;
  }

}
