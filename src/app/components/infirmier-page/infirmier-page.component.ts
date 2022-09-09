import { Component, OnInit } from '@angular/core';
import { Infirmier } from 'src/app/models/infirmier.model';
import { InfirmierService } from 'src/app/services/infirmier/infirmier.service';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private service: InfirmierService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idParam = params['id'];
      this.nomPatParam = params['nomP'];
      alert(this.idParam + this.nomPatParam);
    })
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

  getInfirmierById = (id: HTMLInputElement) => {
    // @ts-ignore
    if (id.value == '') {
      if (!this.hidden_by_id) {
        this.hidden_by_id = true;
      }
      alert("Pas d'id renseigné");
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

  getInfirmierByName = (name: HTMLInputElement) => {
    if (name.value == '') {
      if (!this.hidden_by_name) {
        this.hidden_by_name = true;
      }
      alert("Pas de nom renseigné");
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

  

  toggleAllInfirmiers(): void {
    this.hidden_all_infirmiers = !this.hidden_all_infirmiers;
  }

}
