import { Component, Input, OnInit } from '@angular/core';
import { Infirmier } from 'src/app/models/infirmier.model';

@Component({
  selector: 'app-generic-fieldset-infirmier',
  templateUrl: './generic-fieldset-infirmier.component.html',
  styleUrls: ['./generic-fieldset-infirmier.component.css']
})
export class GenericFieldsetInfirmierComponent implements OnInit {

  @Input()
  infirmier!: Infirmier;
  @Input()
  type!: string;

  constructor() { }

  ngOnInit(): void {
  }
}
