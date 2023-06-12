import { Prenotazione } from "./prenotazione";
import { Ruolo } from "./ruolo";
import {Stato} from "./stato";

export interface Utente {
  id:number;
  nome: string;
  cognome: string;
  dataNascita:Date;
  username:string;
  password:string;
  ruolo:Ruolo;
  prenotazioni:Prenotazione[];
  stato:Stato
}
