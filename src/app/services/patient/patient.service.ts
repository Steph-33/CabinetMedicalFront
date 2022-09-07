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

  getPatientByName : (name: string) => Observable<Patient> = (name: string) => {
    return this.http.get<Patient>(`${this.domaine}/patients/name/${name}`);
  }

  createPatient : (item: Patient) => Observable<Observable<Patient>> = (item: Patient) => {
    return this.http.post<Observable<Patient>>(`${this.domaine}/patients`, item);
  }

  deletePatient : (id: string) => Observable<Patient> = (id: string) => {
    return this.http.delete<Patient>(`${this.domaine}/patients/${id}`);
  }

}
