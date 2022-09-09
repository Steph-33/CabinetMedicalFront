import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Infirmier } from 'src/app/models/infirmier.model';

@Injectable({
  providedIn: 'root'
})
export class InfirmierService {

  domaine: string = environment.domaine;

  constructor(private http: HttpClient) { }

  /*
  Get all the infirmiers
  */
  // @ts-ignore
  getAllInfirmiers : Observable<Infirmier[]> = () => {
    return this.http.get<Infirmier[]>(`${this.domaine}/infirmiers`);
  }

  /*
  Get infirmier by id
   */
  getInfirmierById : (id: string) => Observable<Infirmier> = (id: string) => {
    return this.http.get<Infirmier>(`${this.domaine}/infirmiers/${id}`);
  }

  getInfirmierByName : (name: string) => Observable<Infirmier> = (name: string) => {
    return this.http.get<Infirmier>(`${this.domaine}/infirmiers/name/${name}`);
  }

  createInfirmier : (item: Infirmier) => Observable<Observable<Infirmier>> = (item: Infirmier) => {
    return this.http.post<Observable<Infirmier>>(`${this.domaine}/infirmiers`, item);
  }

  deleteInfirmier = (id: string|undefined) => {
    return this.http.patch(`${this.domaine}/infirmiers/${id}`, "");
  }

  activateInfirmier = (id: string|undefined) => {
    return this.http.patch(`${this.domaine}/infirmiers/active/${id}`, "");
  }

  updateInfirmier : (id:string, item: Infirmier) => Observable<Infirmier> = (id:string, item: Infirmier) => {
    return this.http.patch<Infirmier>(`${this.domaine}/infirmiers/update/${id}`, item);
  }

}
