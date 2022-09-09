import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Infirmier } from 'src/app/models/infirmier.model';
import { InfirmierService } from 'src/app/services/infirmier/infirmier.service';

@Component({
  selector: 'app-infirmier-create',
  templateUrl: './infirmier-create.component.html',
  styleUrls: ['./infirmier-create.component.css']
})
export class InfirmierCreateComponent implements OnInit {

  infirmiers: Infirmier[] = [new Infirmier()];
  hidden_create: boolean = true;

  newInfirmierForm: FormGroup;

  constructor(private service: InfirmierService) { 
    this.newInfirmierForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      telPro: new FormControl('', Validators.required),
      telMobile: new FormControl('', Validators.required),
      telFixe: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getInfirmiers();
  }

  getInfirmiers = () => {
    // @ts-ignore
    this.service.getAllInfirmiers().subscribe((res: any) => {
      this.infirmiers = res},
      (err: any) => {
        console.error(err)
      }
    )
  }

  submitCreate(): void {
    let newItem = new Infirmier();
      newItem.nom = this.newInfirmierForm.controls['nom'].value;
      newItem.prenom = this.newInfirmierForm.controls['prenom'].value;
      newItem.telPro = this.newInfirmierForm.controls['telPro'].value;
      newItem.telMobile = this.newInfirmierForm.controls['telMobile'].value;
      newItem.telFixe = this.newInfirmierForm.controls['telFixe'].value;
      newItem.active = true;

    this.service.createInfirmier(newItem).subscribe(
      res => {
        this.getInfirmiers()
      }, err => {
        console.error(err)
      })

      // Remise à 0 du formulaire
    this.newInfirmierForm.reset();
    this.hidden_create = true;
  }

  toggleInfirmier(): void { 
    this.hidden_create = !this.hidden_create;
  }

}
