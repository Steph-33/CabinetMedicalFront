import { Infirmier } from "./infirmier.model";
import { Patient } from "./patient.model";

export class Deplacement {
    public id?: string;
    public cout?: number;
    public date?: string;
    public patient? : Patient; 
    public infirmier? : Infirmier; 
}
