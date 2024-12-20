import { Justification } from "../justification/justification.module";
import { User } from "../user.model";

export interface Absence {
  id?: number;
  dateDebut?: string;
  dateFin?:string;
  motif?: string;
  user?:User | null;
  justification?:Justification|null;
}
