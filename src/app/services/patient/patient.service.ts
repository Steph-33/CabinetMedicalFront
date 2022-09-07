import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  domaine: string = environment.domaine;

  constructor(private http: HttpClient) { }

  /*
  Get all the patients
  */
  // @ts-ignore
  getAllPatients : Observable<Patient[]> = () => {
    return this.http.get<Patient[]>(`${this.domaine}/patients`);
  }

  /*
  Get patient by id
   */
  getPatientById : (id: string) => Observable<Patient> = (id: string) => {
    return this.http.get<Patient>(`${this.domaine}/patients/${id}`);
  }

  /*
  Get patient by name
  */
  getPatientByName : (name: string) => Observable<Patient> = (name: string) => {
    return this.http.get<Patient>(`${this.domaine}/patients/name/${name}`);
  }

  /*
  Create a patient
  */
  createPatient : (item: Patient) => Observable<Observable<Patient>> = (item: Patient) => {
    return this.http.post<Observable<Patient>>(`${this.domaine}/patients`, item);
  }

  /*
  Delete a patient <-> change its attribute active to false
  */
  deletePatient = (id: string|undefined) => {
    return this.http.patch(`${this.domaine}/patients/${id}`, "");
  }

  /*
  Update a patient
  */
  updatePatient : (id:string, item: Patient) => Observable<Patient> = (id:string, item: Patient) => {
    return this.http.patch<Patient>(`${this.domaine}/patients/update/${id}`, item);
  }


}
