import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';
import {Observable} from 'rxjs';
import {Ruolo} from '../models/ruolo';
import {TipoVeicolo} from '../models/tipo-veicolo';
import {Veicolo} from '../models/veicolo';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataServiceService implements InMemoryDbService {

  constructor() {
  }

  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
    const veicoli = [
      {
        id: 1,
        casaCostruttrice: 'Fiat',
        modello: '500',
        tipoVeicolo: TipoVeicolo.AUTO,
        annoImmatricolazione: 2010,
        targa: 'AB123CD',
        prenotazioni: undefined
      },
      {
        id: 2,
        casaCostruttrice: 'Audi',
        modello: 'Q2',
        tipoVeicolo: TipoVeicolo.AUTO,
        annoImmatricolazione: 2015,
        targa: 'AX123CD',
        prenotazioni: undefined
      },
      {
        id: 3,
        casaCostruttrice: 'Fiat',
        modello: 'Fiorino',
        tipoVeicolo: TipoVeicolo.FURGONE,
        annoImmatricolazione: 2009,
        targa: 'AB123GG',
        prenotazioni: undefined
      },
      {
        id: 4,
        casaCostruttrice: 'RangeRover',
        modello: 'Xsport',
        tipoVeicolo: TipoVeicolo.SUV,
        annoImmatricolazione: 2020,
        targa: 'AB653CD',
        prenotazioni: undefined
      },
      {
        id: 5,
        casaCostruttrice: 'Opel',
        modello: 'Zafira',
        tipoVeicolo: TipoVeicolo.MINIVAN,
        annoImmatricolazione: 2010,
        targa: 'AB563AD',
        prenotazioni: undefined
      },
      {
        id: 6,
        casaCostruttrice: 'Smart',
        modello: 'ForTwo',
        tipoVeicolo: TipoVeicolo.AUTO,
        annoImmatricolazione: 2022,
        targa: 'LL123CD',
        prenotazioni: undefined
      },
    ];

    const utenti = [
      {
        id: 1,
        nome: 'Mario',
        cognome: 'Rossi',
        dataNascita: new Date('1996-05-03').toLocaleDateString(),
        email: 'mariross@gmai.com',
        username: 'marRoss',
        password: 'marRoss',
        ruolo: Ruolo.CUSTOMER,
        prenotazioni: 1
      },
      {
        id: 2,
        nome: 'Anna',
        cognome: 'Biondi',
        dataNascita: new Date('1996-05-03').toLocaleDateString(),
        email: 'annbiond@gmai.com',
        username: 'annb',
        password: 'annb',
        ruolo: Ruolo.CUSTOMER,
        prenotazioni: 2
      },
      {
        id: 3,
        nome: 'Giuseppe',
        cognome: 'Verdi',
        dataNascita: new Date('1996-05-03').toLocaleDateString(),
        email: 'giusver@gmai.com',
        username: 'giuv',
        password: 'giuv',
        ruolo: Ruolo.CUSTOMER,
        prenotazioni: [3,4]
      },
      {
        id: 4,
        nome: 'Simona',
        cognome: 'Scala',
        dataNascita: new Date('1986-12-13').toLocaleDateString(),
        email: 'simscal@gmail.com',
        username: 'simscal',
        password: 'simscal',
        ruolo: Ruolo.CUSTOMER,
        prenotazioni: undefined
      },
    ];


    const prenotazioni = [
      {id: 1, dataInizio: new Date('2023-10-03').toLocaleDateString(), dataFine: new Date('2023-10-10').toLocaleDateString(), approvazione: true, utente:1, utenteId: 1, veicolo: 6},
      {id: 2, dataInizio: new Date('2023-11-04').toLocaleDateString(), dataFine: new Date('2023-11-15').toLocaleDateString(), approvazione: true, utente:2,utenteId: 3, veicolo: 3},
      {id: 3, dataInizio: new Date('2022-05-03').toLocaleDateString(), dataFine: new Date('2022-05-10').toLocaleDateString(), approvazione: false, utente:3,utenteId: 3, veicolo: 5},
      {id: 4, dataInizio: new Date('2023-05-03').toLocaleDateString(), dataFine: new Date('2023-05-10').toLocaleDateString(), approvazione: false, utente:3,utenteId: 3, veicolo: 2}

    ];


    return {veicoli, prenotazioni, utenti};
  }


}
