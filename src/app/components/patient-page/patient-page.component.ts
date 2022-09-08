import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  hidden_create: boolean = true;
  hidden_update: boolean = true;

  newPatient: FormGroup;
  updatePatient: FormGroup;

  constructor(private service: PatientService) { 
    this.newPatient = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      sexe: new FormControl('', [Validators.required, Validators.pattern('F|M')]),
      dateNaissance: new FormControl('', [Validators.required, Validators.pattern('[0-3][0-9]/[0-1][0-9]/[1-2][0-9][0-9][0-9]')]),
      adresse: new FormControl('', Validators.required),
      numSecu: new FormControl('', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9] [0-9][0-9]')])
    })
    this.updatePatient = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      sexe: new FormControl('', [Validators.required, Validators.pattern('F|M')]),
      dateNaissance: new FormControl('', [Validators.required, Validators.pattern('[0-3][0-9]/[0-1][0-9]/[1-2][0-9][0-9][0-9]')]),
      adresse: new FormControl('', Validators.required),
      numSecu: new FormControl('', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9] [0-9][0-9]')])
    })
  }

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

  submitCreate(): void {
    let newItem = new Patient();
      newItem.nomPatient = this.newPatient.controls['nom'].value;
      newItem.prenomPatient = this.newPatient.controls['prenom'].value;
      newItem.dateNaissance = this.newPatient.controls['dateNaissance'].value;
      newItem.sexe = this.newPatient.controls['sexe'].value;
      newItem.adresse = this.newPatient.controls['adresse'].value;
      newItem.numeroSecu = this.newPatient.controls['numSecu'].value;
      newItem.active = true;

    this.service.createPatient(newItem).subscribe(
      res => {
        this.getPatients()
      }, err => {
        console.error(err)
      })

      // Remise à 0 du formulaire
    this.newPatient.reset();
  }
  
  deletePatient(id: string|undefined): void {
    this.service.deletePatient(id).subscribe(
      ok => {
        this.getPatients();
      },
      err => {
        console.error(err)
      }
    )
  }

  submitUpdate(idUpdatedPatient: HTMLInputElement): void {
    let newItem = new Patient();
      newItem.nomPatient = this.updatePatient.controls['nom'].value;
      newItem.prenomPatient = this.updatePatient.controls['prenom'].value;
      newItem.dateNaissance = this.updatePatient.controls['dateNaissance'].value;
      newItem.sexe = this.updatePatient.controls['sexe'].value;
      newItem.adresse = this.updatePatient.controls['adresse'].value;
      newItem.numeroSecu = this.updatePatient.controls['numSecu'].value;
      newItem.active = true;

    this.service.updatePatient(idUpdatedPatient.value, newItem).subscribe(
      ok => {
        this.getPatients()
      },
        err => {
          console.error(err)
      }
    );
    // Remise à 0 du formulaire
    this.updatePatient.reset();
    idUpdatedPatient.value = '';
  }

  togglePatient():void { 
    this.hidden_create = !this.hidden_create;
  }
  
  toggleUpdatePatient():void { 
    this.hidden_update = !this.hidden_update;
  }

  toggleAllPatients(): void {
    this.hidden_all_patients = !this.hidden_all_patients;
  }

}
