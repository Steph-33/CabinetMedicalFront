import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Infirmier } from 'src/app/models/infirmier.model';
import { InfirmierService } from 'src/app/services/infirmier/infirmier.service';


@Component({
  selector: 'app-infirmier-update',
  templateUrl: './infirmier-update.component.html',
  styleUrls: ['./infirmier-update.component.css']
})
export class InfirmierUpdateComponent implements OnInit {

  infirmiers: Infirmier[] = [new Infirmier()];
  hidden_update: boolean = true;

  updateInfirmierForm: FormGroup;

  constructor(private service: InfirmierService) { 
    this.updateInfirmierForm = new FormGroup({
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

  submitUpdate(idUpdatedInfirmier: HTMLSelectElement): void {
    let newItem = new Infirmier();
      newItem.nom = this.updateInfirmierForm.controls['nom'].value;
      newItem.prenom = this.updateInfirmierForm.controls['prenom'].value;
      newItem.telPro = this.updateInfirmierForm.controls['telPro'].value;
      newItem.telMobile = this.updateInfirmierForm.controls['telMobile'].value;
      newItem.telFixe = this.updateInfirmierForm.controls['telFixe'].value;
      newItem.active = true;

    this.service.updateInfirmier(idUpdatedInfirmier.value, newItem).subscribe(
      ok => {
        this.getInfirmiers()
      },
        err => {
          console.error(err)
      }
    );
    // Remise à 0 du formulaire
    this.updateInfirmierForm.reset();
    idUpdatedInfirmier.value = '';
  }

  toggleUpdateInfirmier(idUpdatedInfirmier: HTMLSelectElement): void {

    if (idUpdatedInfirmier.value == 'Choisir un nom') {
      alert("Nom invalide");
      this.hidden_update = true;  
    } else {
      this.service.getInfirmierById(idUpdatedInfirmier.value).subscribe((res:Infirmier) => {
        this.updateInfirmierForm.controls['nom'].setValue(res.nom);
        this.updateInfirmierForm.controls['prenom'].setValue(res.prenom);
        this.updateInfirmierForm.controls['telPro'].setValue(res.telPro);
        this.updateInfirmierForm.controls['telMobile'].setValue(res.telMobile);
        this.updateInfirmierForm.controls['telFixe'].setValue(res.telFixe);
        this.hidden_update = false;
      },
      (err: any) => {
        console.error(err);
      })
    }
  }

}
