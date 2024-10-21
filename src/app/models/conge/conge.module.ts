import { User } from "../user.model";

export interface Conge {
  id?: number;
  dateDebut?: string;
  dateFin?:string;
  motif?: string;
  status?: string;
  userFirstName?: String;
  userLastName?: String;
}
