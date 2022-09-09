import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PatientPageComponent } from '../patient-page/patient-page.component';
import { Output } from '@angular/core';

@Component({
  selector: 'app-generic-form-patient',
  templateUrl: './generic-form-patient.component.html',
  styleUrls: ['./generic-form-patient.component.css']
})
export class GenericFormPatientComponent implements OnInit {

  @Output()
  submitCreate: EventEmitter<Patient> = new EventEmitter<Patient>();

  @Input()
  patientUpdate?: Patient;

  patientForm: FormGroup;

  constructor(private service: PatientService) { 
    this.patientForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      sexe: new FormControl('', [Validators.required, Validators.pattern('F|M')]),
      dateNaissance: new FormControl('', [Validators.required, Validators.pattern('[0-3][0-9]/[0-1][0-9]/[1-2][0-9][0-9][0-9]')]),
      adresse: new FormControl('', Validators.required),
      numSecu: new FormControl('', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9] [0-9][0-9]')])
    })
  }

  ngOnInit(): void {
  }

  submit() {
    let item = new Patient();
    item.nomPatient = this.patientForm.controls['nom'].value;
    item.prenomPatient = this.patientForm.controls['prenom'].value;
    item.dateNaissance = this.patientForm.controls['dateNaissance'].value;
    item.sexe = this.patientForm.controls['sexe'].value;
    item.adresse = this.patientForm.controls['adresse'].value;
    item.numeroSecu = this.patientForm.controls['numSecu'].value;
    item.active = true;

    this.submitCreate.emit(item);
  }

}
