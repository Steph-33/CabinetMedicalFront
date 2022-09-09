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

  idParam!: string;
  nomPatParam!:string;

  constructor(private service: InfirmierService) {   }

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

  toggleAllInfirmiers(): void {
    this.hidden_all_infirmiers = !this.hidden_all_infirmiers;
  }

}
