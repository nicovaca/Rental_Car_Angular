import { Prenotazione } from "./prenotazione";
import { TipoVeicolo } from "./tipo-veicolo";

export interface Veicolo {
  id: number;
  casaCostruttrice: string;
  modello: string;
  tipoVeicolo: TipoVeicolo;
  annoImmatricolazione: number;
  targa: string;
  prenotazioni: Prenotazione[];
}
