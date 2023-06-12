import {Component, OnInit, AfterContentInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {MyAction} from 'src/app/configs/configClass/my-action';
import {MyTableActionEnum} from 'src/app/configs/configClass/my-table-action-enum';
import {MyTableConfig} from 'src/app/configs/my-table-config/my-table-config';
import {PeriodoPrenotazione} from 'src/app/models/periodo-prenotazione';
import {Prenotazione} from 'src/app/models/prenotazione';
import {PrenotazioniService} from 'src/app/services/prenotazioni.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  prenotazioni: Prenotazione[] = []
  periodoPrenotazione: PeriodoPrenotazione[] = []
  prenotazione!: Prenotazione
  veicoloId!: number
  utenteId!:number

  constructor(
    private prenotazioneService: PrenotazioniService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getPrenotazioni();
  }


  getPrenotazioni() {
    this.prenotazioneService.getPrenotazioni()
      .subscribe(prenotazioni => (this.prenotazioni = prenotazioni)
        .forEach((p)=> {
          p.nomeUtente=p.utente.nome + " " + p.utente.cognome
          p.nomeVeicolo=p.veicolo.casaCostruttrice +" " + p.veicolo.modello
          p.utenteId=p.utente.id
          p.veicoloId=p.veicolo.id

        })
      );
  }



  headersTable: MyTableConfig = {
    headers: [
      {key: "id", label: "Id Prenotazione"},
      {key: "dataInizio", label: "Data Inizio Prenotazione"},
      {key: "dataFine", label: "Data Fine Prenotazione"},
      {key: "approvazione", label: "Approvazione"},
      {key: "nomeUtente", label: "Utente"},
      {key: "nomeVeicolo", label: "Veicolo"}

    ],
    order: {defaultColumn: "id", orderType: "desc"},
    search: {columns: ["nomeUtente", "nomeVeicolo"]},
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
        type: MyTableActionEnum.APPROVA, buttonConfig: {
          customCssClass: 'btn btn-outline-success',
          icon: 'fa fa-bars',
          text: 'Approva'
        }, newRowButton: false
      }
    ]
  }

  eliminaPrenotazione(dataInizio: Date) {
    if (new Date(dataInizio).getTime() - new Date().getTime() <= 2) {
      return false
    } else
      return true
  }

  getAction(action: MyAction, object: any) {

    let id: number = object ? object.id : 0

    console.log(id)
    switch (action.type) {
      case MyTableActionEnum.DELETE:
        if (this.eliminaPrenotazione(object.dataInizio)) {

          this.prenotazioni = this.prenotazioni.filter(p => p.id !== id);
          this.prenotazioneService.deletePrenotazione(id).subscribe();
        } else {
          window.alert('La prenotazione non può essere cancellata.')
        }
        break;

      case MyTableActionEnum.EDIT:
        let prenotazione = this.prenotazioni.filter(p => p.id === id).shift()
        let idUtente = prenotazione ? prenotazione.utenteId : 0
        this.router.navigate(['prenotazioni/prenotazioniCustomer/', id, idUtente])
        break;

      case MyTableActionEnum.NEW_ROW:
        let idNew = 0
        this.router.navigate(['prenotazioni/', idNew])
        break;

      case MyTableActionEnum.APPROVA:
        let prenotazioneDaApprovare = this.prenotazioni.filter(p => p.id === id).shift()
        if (prenotazioneDaApprovare && !prenotazioneDaApprovare.approvazione){
          this.prenotazioneService.approvaPrenotazione(prenotazioneDaApprovare?.id).subscribe()

          this.router.navigate(['prenotazioni/']).then(() => {
            window.location.reload();
          });
        }
        else {
          window.alert('La prenotazione è già stata approvata.')
        }
        break;

    }


  }

}
