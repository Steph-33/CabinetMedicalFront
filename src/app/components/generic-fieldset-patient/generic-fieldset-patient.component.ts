import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-generic-fieldset-patient',
  templateUrl: './generic-fieldset-patient.component.html',
  styleUrls: ['./generic-fieldset-patient.component.css']
})
export class GenericFieldsetPatientComponent implements OnInit {

  @Input()
  patient!: Patient;
  @Input()
  type!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
