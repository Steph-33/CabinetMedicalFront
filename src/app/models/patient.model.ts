export class Patient {
    public id?: string;
    public nomPatient?: string;
    public prenomPatient?: string;
    public dateNaissance?: string;
    public sexe?: string;
    public adresse?: string;
    public numeroSecu?: string;
    public active?: boolean;

    /*
    public constructor(nomPatient: string, prenomPatient: string, dateNaissance: string, sexe: string,
        adresse: string, numeroSecu: string, active: boolean) {
        this.nomPatient = nomPatient;
        this.prenomPatient = prenomPatient;
        this.dateNaissance = dateNaissance;
        this.sexe = sexe;
        this.adresse = adresse;
        this.numeroSecu = numeroSecu;
        this.active = active;
    }
    */
}
