import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Infirmier } from 'src/app/models/infirmier.model';
import { Patient } from 'src/app/models/patient.model';
import { InfirmierService } from 'src/app/services/infirmier/infirmier.service';
import { PatientService } from 'src/app/services/patient/patient.service';


@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css']
})
export class PatientPageComponent implements OnInit {

  // List of all patients
  patients: Patient[] = [new Patient()];
  // List of all nurses  
  infirmiers : Infirmier[] = [new Infirmier()];
  // Patient got by its id
  patientId: Patient = new Patient();
  // Patient got by its name
  patientName : Patient = new Patient();
  // Infirmier got by its id
  infirmierId: Infirmier = new Infirmier();
  // Attributes to display/hide parts of the page
  hidden_all_patients: boolean = true;
  hidden_by_id: boolean = true;
  hidden_by_name: boolean = true;
  hidden_create: boolean = true;
  hidden_update: boolean = true;

  // Form to update a patient
  updatePatientForm: FormGroup;

  constructor(private service: PatientService, private infirmierService : InfirmierService) { 
    this.updatePatientForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      sexe: new FormControl('', [Validators.required, Validators.pattern('F|M')]),
      dateNaissance: new FormControl('', [Validators.required, Validators.pattern('[0-3][0-9]/[0-1][0-9]/[1-2][0-9][0-9][0-9]')]),
      adresse: new FormControl('', Validators.required),
      numSecu: new FormControl('', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9] [0-9][0-9]')]),
      infirmier: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getPatients();
    this.getAllInfirmiers();
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

  getAllInfirmiers = () => {
    // @ts-ignore
    this.infirmierService.getAllInfirmiers().subscribe((res: any) => {
      this.infirmiers = res
    },
      (err: any) => {
        console.error(err)
      }
    )
  }

  getInfirmierById(idInf: string) {
    this.infirmierService.getInfirmierById(idInf).subscribe((res: Infirmier) => {
      this.infirmierId = res;
    })
  }

  getPatientById = (id: HTMLSelectElement) => {
    // @ts-ignore
    if (id.value == '' || id.value == 'Choisir un id') {
      if (!this.hidden_by_id) {
        this.hidden_by_id = true;
      }
      alert("Pas d'id valide renseign??");
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

  getPatientByName = (name: HTMLSelectElement) => {
    if (name.value == '' || name.value == 'Choisir un nom') {
      if (!this.hidden_by_name) {
        this.hidden_by_name = true;
      }
      alert("Pas de nom valide renseign??");
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

  submitCreate(item: Patient): void {
        
    if (item.infirmier?.nom == undefined) {
      alert("infirmier undefined");
    } else {
      this.service.createPatient(item).subscribe(
        res => {
          this.getPatients();
          alert("creating");
        }, err => {
          console.error(err)
        })
      }

      // Remise ?? 0 du formulaire
      this.hidden_create = true;
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

  activePatient(id: string|undefined): void {
    this.service.activatePatient(id).subscribe(
      ok => {
        this.getPatients();
      },
        err => {
          console.error(err);
      } 
    )
  }

  toggleUpdatePatient(idUpdatedPatient: HTMLSelectElement): void {

    if (idUpdatedPatient.value == 'Choisir un nom') {
      alert("Nom invalide");
      this.hidden_update = true;  
    } else {
      this.service.getPatientById(idUpdatedPatient.value).subscribe((res:Patient) => {
        this.updatePatientForm.controls['nom'].setValue(res.nomPatient);
        this.updatePatientForm.controls['prenom'].setValue(res.prenomPatient);
        this.updatePatientForm.controls['sexe'].setValue(res.sexe);
        this.updatePatientForm.controls['dateNaissance'].setValue(res.dateNaissance);
        this.updatePatientForm.controls['adresse'].setValue(res.adresse);
        this.updatePatientForm.controls['numSecu'].setValue(res.numeroSecu);
        this.updatePatientForm.controls['infirmier'].setValue(res.infirmier?.nom + " " + res.infirmier?.prenom);
        this.hidden_update = false;
      },
      (err: any) => {
        console.error(err);
      })
    }
  }

  submitUpdate(idUpdatedPatient: HTMLSelectElement): void {
    let newItem = new Patient();
      newItem.nomPatient = this.updatePatientForm.controls['nom'].value;
      newItem.prenomPatient = this.updatePatientForm.controls['prenom'].value;
      newItem.dateNaissance = this.updatePatientForm.controls['dateNaissance'].value;
      newItem.sexe = this.updatePatientForm.controls['sexe'].value;
      newItem.adresse = this.updatePatientForm.controls['adresse'].value;
      newItem.numeroSecu = this.updatePatientForm.controls['numSecu'].value;
      newItem.infirmier = this.infirmierId;
      newItem.active = true;

    this.service.updatePatient(idUpdatedPatient.value, newItem).subscribe(
      ok => {
        this.getPatients()
      },
        err => {
          console.error(err)
      }
    );
    // Remise ?? 0 du formulaire
    this.updatePatientForm.reset();
    idUpdatedPatient.value = '';
    this.hidden_update = true;
  }

  togglePatient(): void { 
    this.hidden_create = !this.hidden_create;
  }

  toggleAllPatients(): void {
    this.hidden_all_patients = !this.hidden_all_patients;
  }

}
