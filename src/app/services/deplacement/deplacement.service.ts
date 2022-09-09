import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deplacement } from 'src/app/models/deplacement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeplacementService {

  domaine: string = environment.domaine;

  constructor(private http: HttpClient) { }

  /**
  * Get Deplacement by patient 
  */
  getDeplacementByPatient : (idPatient: string) => Observable<Deplacement[]> = (idPatient: string) => {
    return this.http.get<Deplacement[]>(`${this.domaine}/deplacements/${idPatient}`);
  }

  /**
  * Get Deplacement by patient and infirmier 
  */
   getDeplacementByPatientAndInfirmier : (idPatient: string, idInfirmier : string) => Observable<Deplacement[]> = (idPatient: string, idInfirmier : string) => {
    return this.http.get<Deplacement[]>(`${this.domaine}/deplacements/${idPatient}/${idInfirmier}`);
  }

  /**
  * Create deplacement  
  */
  createDeplacement : (item: Deplacement) => Observable<Observable<Deplacement>> = (item: Deplacement) => {
    return this.http.post<Observable<Deplacement>>(`${this.domaine}/deplacements`, item);
  }

  /**
  * Update deplacement  
  */
   updateDeplacement : (id : string, item: Deplacement) => Observable<Observable<Deplacement>> = (id : string, item: Deplacement) => {
    return this.http.patch<Observable<Deplacement>>(`${this.domaine}/deplacements/${id}`, item);
  }

  /**
   *  Delete deplacement
   */
   deleteDeplacement : (id: string|undefined) => Observable<Deplacement> = (id: string|undefined) => {
    return this.http.delete<Deplacement>(`${this.domaine}/deplacements/${id}`);
  }

}
