import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Deplacement } from 'src/app/models/deplacement.model';
import { DeplacementService } from 'src/app/services/deplacement/deplacement.service';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { InfirmierService } from 'src/app/services/infirmier/infirmier.service';
import { Patient } from 'src/app/models/patient.model';
import { Infirmier } from 'src/app/models/infirmier.model';

@Component({
  selector: 'app-add-deplacement-page',
  templateUrl: './add-deplacement-page.component.html',
  styleUrls: ['./add-deplacement-page.component.css']
})
export class AddDeplacementPageComponent implements OnInit {

  patientId!: string;
  infirmierId!: string;
  newDeplacement: FormGroup;
  patient: Patient = new Patient();
  infirmier: Infirmier = new Infirmier();

  constructor(private service: DeplacementService, private route: ActivatedRoute, private servicePatient: PatientService, private serviceInfirmier: InfirmierService) {
    this.newDeplacement = new FormGroup({
      cout: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required, Validators.pattern('[0-3][0-9]-[0-1][0-9]-[1-2][0-9][0-9][0-9]')]),
      patient: new FormControl('', Validators.required),
      infirmier: new FormControl('', Validators.required),
    })

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.newDeplacement.controls['patient'].setValue(params['idPat']);
      this.newDeplacement.controls['infirmier'].setValue(params['idInf']);
      this.patientId = params['idPat'];
      this.infirmierId = params['idInf'];

      // Get Patient from its id
      this.servicePatient.getPatientById(this.patientId).subscribe((res: Patient) => {
        this.patient = res;
      });

      // Get Infirmier from its id
      this.serviceInfirmier.getInfirmierById(this.infirmierId).subscribe((res: Infirmier) => {
        this.infirmier = res;
      });
    })
  }

  /**
  * Création d'un nouveau déplacement
  */
  submitCreate(): void {
    let newItem = new Deplacement();
    newItem.cout = this.newDeplacement.controls['cout'].value;
    newItem.date = this.newDeplacement.controls['date'].value;
    newItem.patient = this.patient;
    newItem.infirmier = this.infirmier;

    // Call the api to create a new deplacement
    this.service.createDeplacement(newItem).subscribe(
      res => {
        alert("Votre nouveau déplacement a bien été créé !");
      }, err => {
        console.error(err)
      })

    // Remise à 0 du formulaire
    this.newDeplacement.reset();
  }

}
