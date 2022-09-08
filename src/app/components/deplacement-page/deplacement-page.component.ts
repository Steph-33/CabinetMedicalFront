import { Component, OnInit } from '@angular/core';
import { Deplacement } from 'src/app/models/deplacement.model';
import { DeplacementService } from 'src/app/services/deplacement/deplacement.service';

@Component({
  selector: 'app-deplacement-page',
  templateUrl: './deplacement-page.component.html',
  styleUrls: ['./deplacement-page.component.css']
})
export class DeplacementPageComponent implements OnInit {

  patientId! : string; 
  infirmierId! : string;
  deplacementsByPatient : Deplacement[] = [new Deplacement()]; 
  deplacementsByPatientAndInfirmier : Deplacement[] = [new Deplacement()]; 
  hidden_by_patient: boolean = true;
  hidden_by_patient_and_infirmier: boolean = true;

  constructor(private service : DeplacementService) { }

  ngOnInit(): void {}

  /**
   * Récupération des déplacements par patient
   * @param id 
   */
  getDeplacementsByPatient = (idPatient: HTMLInputElement) => {
    if (idPatient.value == '') {
      if (!this.hidden_by_patient) {
        this.hidden_by_patient = true;
      }
      alert("Pas d'id renseigné");
    } else {
      this.patientId = idPatient.value; 
      this.service.getDeplacementByPatient(idPatient.value).subscribe((res:Deplacement[]) => {
        this.deplacementsByPatient = res},
        (err: any) => {
          console.error(err);
        }
      )
      if (this.hidden_by_patient) {
        this.hidden_by_patient = false;
      }
      idPatient.value = '';
    }
  }

  /**
   * Récupération des déplacements par patient et par infirmier
   * @param id 
   */
   getDeplacementsByPatientAndInfirmier = (idPatient: HTMLInputElement, idInfirmier : HTMLInputElement) => {
    if (idPatient.value == '' || idInfirmier.value == '') {
      if (!this.hidden_by_patient_and_infirmier) {
        this.hidden_by_patient_and_infirmier = true;
      }
      alert("Un id n'a pas été renseigné");
    } else {
      this.patientId = idPatient.value; 
      this.infirmierId = idInfirmier.value; 
      this.service.getDeplacementByPatientAndInfirmier(idPatient.value, idInfirmier.value).subscribe((res:Deplacement[]) => {
        this.deplacementsByPatientAndInfirmier = res},
        (err: any) => {
          console.error(err);
        }
      )
      if (this.hidden_by_patient_and_infirmier) {
        this.hidden_by_patient_and_infirmier = false;
      }
      idPatient.value = '';
      idInfirmier.value = '';
    }
  }

  

}
