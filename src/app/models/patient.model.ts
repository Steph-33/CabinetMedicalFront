import { Infirmier } from "./infirmier.model";

export class Patient {
    public id?: string;
    public nomPatient?: string;
    public prenomPatient?: string;
    public dateNaissance?: string;
    public sexe?: string;
    public adresse?: string;
    public numeroSecu?: string;
    public active?: boolean;
    public infirmier?: Infirmier;

}
