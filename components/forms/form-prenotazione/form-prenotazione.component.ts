import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Prenotazione} from 'src/app/models/prenotazione';
import {Utente} from 'src/app/models/utente';
import {Veicolo} from 'src/app/models/veicolo';
import {PrenotazioniService} from 'src/app/services/prenotazioni.service';
import {UtentiService} from 'src/app/services/utenti.service';
import {VeicoliService} from 'src/app/services/veicoli.service';
import {PeriodoPrenotazione} from "../../../models/periodo-prenotazione";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-form-prenotazione',
  templateUrl: './form-prenotazione.component.html',
  styleUrls: ['./form-prenotazione.component.css']
})
export class FormPrenotazioneComponent implements OnInit {
  prenotazione!: any
  prenotazioni: Prenotazione[] = []
  prenotazioneIdFromRoute: any
  id!: number
  utenteId!: number
  utente!: Utente
  veicolo!: Veicolo
  veicoli: Veicolo[] = []


  isUserLoggedIn = false;
  ruolo: string = ''
  idUtente!: number


  constructor(private route: ActivatedRoute,
              private prenotazioneService: PrenotazioniService,
              private veicoloService: VeicoliService,
              private utenteService: UtentiService,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.prenotazioneIdFromRoute = Number(routeParams.get('id'));
    this.utenteId = Number(routeParams.get('idUtente'));

    let storeData = sessionStorage.getItem("isUserLoggedIn");
    let ruolo = sessionStorage.getItem("ruolo");
    let idUtente = sessionStorage.getItem("idUtente");
    console.log("StoreData: " + storeData);

    if (storeData != null && storeData == "true")
      this.isUserLoggedIn = true;
    if (ruolo == 'admin') {
      this.ruolo = ruolo
    } else if (ruolo == 'customer') {
      this.ruolo = ruolo
      this.idUtente = Number(idUtente)
    } else
      this.isUserLoggedIn = false;


    if (this.prenotazioneIdFromRoute !== 0) {
      //
      if (this.ruolo=='admin'){
        this.prenotazioneService.getPrenotazioneById(this.prenotazioneIdFromRoute).subscribe((prenotazione) => {
          this.prenotazione = prenotazione
          console.log(this.prenotazione)
        })
      }else if (this.ruolo=='customer' && this.utenteId == this.authService.getIdUtente()){
        this.prenotazioneService.getPrenotazioneById(this.prenotazioneIdFromRoute).subscribe((prenotazione) => {
          this.prenotazione = prenotazione
          console.log(this.prenotazione)
        })
      }else {
        this.router.navigate(['/login'])
      }


    } else {
      this.utenteService.getUtenteById(this.utenteId).subscribe((utente) => {
        this.utente = utente
      })
      console.log(this.utente)
      this.prenotazioneService.getPrenotazioni().subscribe((r) => {
        this.id = r.length + 1
        console.log(this.id)
        this.prenotazione = {
          id: "",
          dataInizio: new Date(),
          dataFine: new Date(),
          approvazione: false,
          utente: this.utente,
          veicolo: this.veicolo,
          idUtente: this.utente.id
        }

      })


    }

    this.getVeicoli()
    console.log(this.veicoli)
  }

  getVeicoli() {
    this.veicoloService.getVeicoli()
      .subscribe(veicoli => (this.veicoli = veicoli));
  }


  saveOrUpdatePrenotazione() {
    if (this.prenotazioneIdFromRoute === 0) {
      this.prenotazioneService.addPrenotazione(this.prenotazione).subscribe(prenotazione => this.prenotazioni.push(prenotazione))
      if (this.ruolo =='admin'){
        this.router.navigate(['prenotazioni']);
      }else {
        this.router.navigate(['prenotazioni/prenotazioniCustomer/',this.utenteId]) .then(() => {
          window.location.reload();
        });
      }

      console.log(this.prenotazione)
      console.log("prenotazione inserita")

    } else {
      this.prenotazioneService.updatePrenotazione(this.prenotazione).subscribe()
      if (this.ruolo =='admin'){
        this.router.navigate(['prenotazioni']);
      }else {
        this.router.navigate(['prenotazioni/prenotazioniCustomer/',this.utenteId])
          .then(() => {
            window.location.reload();
          });
      }
      console.log(this.prenotazione)
      console.log("prenotazione modificata")

    }
  }
}
