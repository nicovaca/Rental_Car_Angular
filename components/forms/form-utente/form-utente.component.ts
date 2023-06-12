import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Utente} from 'src/app/models/utente';
import {UtentiService} from 'src/app/services/utenti.service';
import {Ruolo} from 'src/app/models/ruolo';
import {Stato} from "../../../models/stato";

@Component({
  selector: 'app-form-utente',
  templateUrl: './form-utente.component.html',
  styleUrls: ['./form-utente.component.css']
})
export class FormUtenteComponent implements OnInit {

  utente!: any
  utenti: Utente[] = []
  utenteIdFromRoute: any
  id!: number
  ruolo!: any

  constructor(private route: ActivatedRoute,
              private utenteService: UtentiService,
              private router: Router) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.utenteIdFromRoute = Number(routeParams.get('id'));
    this.ruolo = sessionStorage.getItem("ruolo");

    if (this.utenteIdFromRoute !== 0) {
      this.utenteService.getUtenteById(this.utenteIdFromRoute).subscribe((utente) => {
        this.utente = utente
        console.log(this.utente)
      })

    } else {
      this.utente = {
        id: "",
        nome: '',
        cognome: '',
        dataNascita: new Date(),
        username: '',
        password: '',
        ruolo: Ruolo.CUSTOMER,
        stato:Stato.IN_ATTIVAZIONE,
        prenotazioni: []
      }
    }
  }

  saveOrUpdateUtente() {
      if (this.utenteIdFromRoute === 0) {
        this.utenteService.addUtente(this.utente).subscribe(utente => this.utenti.push(utente))
        this.router.navigate(['utenti']);
        console.log(this.utente)

      } else {
        this.utenteService.updateUtente(this.utente).subscribe()
        this.router.navigate(['utenti']);

      }
  }

}
