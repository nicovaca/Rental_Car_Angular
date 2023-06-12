import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MyAction} from 'src/app/configs/configClass/my-action';
import {MyTableActionEnum} from 'src/app/configs/configClass/my-table-action-enum';
import {MyTableConfig} from 'src/app/configs/my-table-config/my-table-config';
import {Prenotazione} from 'src/app/models/prenotazione';
import {Utente} from 'src/app/models/utente';
import {PrenotazioniService} from 'src/app/services/prenotazioni.service';
import {UtentiService} from 'src/app/services/utenti.service';
import {AuthenticationService} from "../../services/authentication.service";
import {MyButtonConfig} from "../../configs/my-button-config/my-button-config";

@Component({
  selector: 'app-profilo-customer',
  templateUrl: './profilo-customer.component.html',
  styleUrls: ['./profilo-customer.component.css']
})
export class ProfiloCustomerComponent implements OnInit {

  prenotazioniUtente: Prenotazione[] = []
  prenotazioni: Prenotazione[] = []
  prenotazione!: Prenotazione
  utente: any
  customer!: Utente


  constructor(
    private utenteService: UtentiService,
    private prenotazioneService: PrenotazioniService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.utente = Number(routeParams.get('id'));
    console.log(this.utente)
    if (this.utente == this.authService.getIdUtente()) {
      this.getPrenotazioneCustomer(this.utente);
      this.getCustomer(this.utente)
    } else {
      this.router.navigate(['/login'])
    }
  }


  getPrenotazioneCustomer(utente: any) {
    console.log(utente)
    if (utente) {
      this.getPrenotazioniUtente(utente)
    } else
      this.getPrenotazioni()
  }

  getCustomer(id: number) {
    this.utenteService.getUtenteById(this.utente).subscribe((u) => {
      this.customer = u
    })
  }

  getPrenotazioniUtente(utente: any) {
    this.prenotazioneService.getPrenotazioniByIdUtente(utente)
      .subscribe(prenotazioni => (this.prenotazioniUtente = prenotazioni)
        .forEach((p) => {
          p.veicoloId = p.veicolo.id;
          p.nomeVeicolo = p.veicolo.casaCostruttrice + " " + p.veicolo.modello
        })
      );
  }

  getPrenotazioni() {
    this.prenotazioneService.getPrenotazioni()
      .subscribe(prenotazioni => this.prenotazioniUtente = prenotazioni)
  }

  eliminaPrenotazione(dataInizio: Date) {
    if (new Date(dataInizio).getTime() - new Date().getTime() <= 2) {
      return false
    } else
      return true
  }


  headersTable: MyTableConfig = {
    headers: [
      {key: "id", label: "Id Prenotazione"},
      {key: "dataInizio", label: "Data Inizio Prenotazione"},
      {key: "dataFine", label: "Data Inizio Prenotazione"},
      {key: "approvazione", label: "Approvazione"},
      {key: "nomeVeicolo", label: "Id Veicolo"}

    ],
    order: {defaultColumn: "id", orderType: "desc"},
    search: {columns: ["nomeVeicolo"]},
    pagination: {itemPerPage: 5, itemPerPageOptions: [5, 10, 15]},
    actions: [
      {
        type: MyTableActionEnum.EDIT, buttonConfig: {
          customCssClass: 'btn btn-info',
          icon: 'fas fa-plus',
          text: 'Modifica'
        }, newRowButton: false
      },
      {
        type: MyTableActionEnum.DELETE, buttonConfig: {
          customCssClass: 'btn btn-danger',
          icon: 'fa fa-trash',
          text: 'Elimina'
        }, newRowButton: false
      },
      {
        type: MyTableActionEnum.NEW_ROW, buttonConfig: {
          customCssClass: 'btn btn-success',
          icon: 'fa fa-plus',
          text: 'Nuova Prenotazione'
        }, newRowButton: true
      },
    ]
  }

  getAction(action: MyAction, object: any) {

    let id: number = object ? object.id : 0

    console.log(id)
    switch (action.type) {
      case MyTableActionEnum.DELETE:
        if (this.eliminaPrenotazione(object.dataInizio)) {
          this.prenotazioniUtente = this.prenotazioniUtente.filter(p => p.id !== id);
          this.prenotazioneService.deletePrenotazione(id).subscribe();
        } else {
          window.alert('La prenotazione non può essere cancellata. La data di inizio deve essere distare almeno 2 giorni dalla data odierna.')
        }
        break;

      case MyTableActionEnum.EDIT:
        this.router.navigate(['prenotazioni/prenotazioniCustomer/', id, this.utente])
        break;

      case MyTableActionEnum.NEW_ROW:
        let idNew = 0
        this.router.navigate(['prenotazioni/prenotazioniCustomer/', idNew, this.utente])
        break;
    }

  }
}
