import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Infirmier } from 'src/app/models/infirmier.model';
import { InfirmierService } from 'src/app/services/infirmier/infirmier.service';


@Component({
  selector: 'app-infirmier-page',
  templateUrl: './infirmier-page.component.html',
  styleUrls: ['./infirmier-page.component.css']
})
export class InfirmierPageComponent implements OnInit {

  infirmiers: Infirmier[] = [new Infirmier()];
  infirmierId: Infirmier = new Infirmier();
  infirmierName : Infirmier = new Infirmier();
  hidden_all_infirmiers: boolean = true;
  hidden_by_id: boolean = true;
  hidden_by_name: boolean = true;
  hidden_create: boolean = true;
  hidden_update: boolean = true;

  newInfirmierForm: FormGroup;
  updateInfirmierForm: FormGroup;

  // idParam!: string;
  // nomPatParam!:string;

  constructor(private service: InfirmierService) { 
    this.newInfirmierForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      telPro: new FormControl('', Validators.required),
      telMobile: new FormControl('', Validators.required),
      telFixe: new FormControl('', Validators.required),

    })
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

  getInfirmierById = (id: HTMLSelectElement) => {
    // @ts-ignore
    if (id.value == '' || id.value == 'Choisir un id') {
      if (!this.hidden_by_id) {
        this.hidden_by_id = true;
      }
      alert("Pas d'id valide renseigné");
    } else {
      this.service.getInfirmierById(id.value).subscribe((res:Infirmier) => {
        this.infirmierId = res},
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

  getInfirmierByName = (name: HTMLSelectElement) => {
    if (name.value == '' || name.value == 'Choisir un nom') {
      if (!this.hidden_by_name) {
        this.hidden_by_name = true;
      }
      alert("Pas de nom valide renseigné");
    } else {
      this.service.getInfirmierByName(name.value).subscribe((res: Infirmier) => {
        this.infirmierName = res},
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
  
  deleteInfirmier(id: string|undefined): void {
    this.service.deleteInfirmier(id).subscribe(
      ok => {
        this.getInfirmiers();
      },
      err => {
        console.error(err)
      }
    )
  }

  activeInfirmier(id: string|undefined): void {
    this.service.activateInfirmier(id).subscribe(
      ok => {
        this.getInfirmiers();
      },
        err => {
          console.error(err);
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

  toggleInfirmier(): void { 
    this.hidden_create = !this.hidden_create;
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

  toggleAllInfirmiers(): void {
    this.hidden_all_infirmiers = !this.hidden_all_infirmiers;
  }

}
