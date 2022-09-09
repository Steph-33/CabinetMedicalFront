import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Deplacement } from 'src/app/models/deplacement.model';
import { Infirmier } from 'src/app/models/infirmier.model';
import { Patient } from 'src/app/models/patient.model';
import { DeplacementService } from 'src/app/services/deplacement/deplacement.service';
import { InfirmierService } from 'src/app/services/infirmier/infirmier.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-deplacement-page',
  templateUrl: './deplacement-page.component.html',
  styleUrls: ['./deplacement-page.component.css']
})
export class DeplacementPageComponent implements OnInit {

  patientId! : string; 
  infirmierId! : string;
  patient! : Patient; 
  deplacementsByPatient : Deplacement[] = [new Deplacement()]; 
  deplacementsByPatientAndInfirmier : Deplacement[] = [new Deplacement()]; 
  hidden_by_patient: boolean = true;
  hidden_by_patient_and_infirmier: boolean = true;
  hidden_create: boolean = true;
  hidden_update: boolean = true;

  newDeplacement : FormGroup; 
  updateDeplacement : FormGroup; 

  constructor(private service : DeplacementService, private patientService : PatientService, private infirmierService : InfirmierService) {
    this.newDeplacement = new FormGroup({
      cout: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required, Validators.pattern('[0-3][0-9]-[0-1][0-9]-[1-2][0-9][0-9][0-9]')]),
      patient: new FormControl('', Validators.required),
      infirmier: new FormControl('', Validators.required),
    })
    this.updateDeplacement = new FormGroup({
      cout: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required, Validators.pattern('[0-3][0-9]-[0-1][0-9]-[1-2][0-9][0-9][0-9]')]),
      patient: new FormControl('', Validators.required),
      infirmier: new FormControl('', Validators.required),
    })
  }

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
        this.deplacementsByPatient = res; 
      },
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

  getPatientById (){
    this.patientService.getPatientById("631750f8c5a4a39de3040c26").subscribe((res : Patient) => {
      this.patient = res; 
    }); 
  }

  /**
  * Création d'un nouveau déplacement
  */
  submitCreate(): void {
    let newItem = new Deplacement();
      newItem.cout = this.newDeplacement.controls['cout'].value;
      newItem.date = this.newDeplacement.controls['date'].value;
      newItem.patient = new Patient();
      this.patientService.getPatientById(this.newDeplacement.controls['patient'].value).subscribe((res : Patient) => {
        newItem.patient = res; 
        console.log("Patient ============> ", newItem.patient); 
      }); 
      newItem.infirmier = new Infirmier(); 
      this.infirmierService.getInfirmierById(this.newDeplacement.controls['infirmier'].value).subscribe((res : Infirmier) => {
        newItem.infirmier = res; 
        console.log("Infirmier ============> ", newItem.infirmier); 
      }); 
    
    this.service.createDeplacement(newItem).subscribe(
      res => {
        alert("Votre nouveau déplacement a bien été créé !")
      }, err => {
        console.error(err)
      })

      // Remise à 0 du formulaire
    this.newDeplacement.reset();
  }


  /**
  * Suppression d'un déplacement
  */
   deleteDeplacement(id: string|undefined): void {
    this.service.deleteDeplacement(id).subscribe(
      ok => {
        alert("Le déplacement a bien été supprimé. "); 
        this.ngOnInit(); 
      },
      err => {
        console.error(err)
      }
    )
  }


  toggleDeplacement():void { 
    this.hidden_create = !this.hidden_create;
  }
  
  toggleUpdateDeplacement():void { 
    this.hidden_update = !this.hidden_update;
  }

}
