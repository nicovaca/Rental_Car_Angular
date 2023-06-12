import { PeriodoPrenotazione } from "./periodo-prenotazione";
import { Utente } from "./utente";
import { Veicolo } from "./veicolo";

export interface Prenotazione {
  id:number;
  dataInizio:Date;
  dataFine:Date;
  periodoPrenotazione:PeriodoPrenotazione;
  approvazione:boolean;
  utente:Utente;
  veicolo:Veicolo;
  nomeUtente:string
  nomeVeicolo:string
  utenteId:number
  veicoloId:number
}


